import configPromise from '@payload-config'
import { del } from '@vercel/blob'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'
import { getTenantFromCookie } from '@/utilities/getTenant'
import { WordPressMigrationService } from './migration-service'
import { MigrationResult, WordPressPost } from './types'
import { parseWordPressSQLInsert } from './wordpress-parser'

export const runtime = 'edge'

// Remove maxDuration as it's not needed with Edge Runtime
// export const maxDuration = 300

export async function POST(req: NextRequest) {
  // Create a TransformStream to stream the response
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  // Function to write to the stream
  const writeToStream = async (message: string) => {
    await writer.write(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`))
  }

  // Function to write a result to the stream
  const writeResultToStream = async (result: any) => {
    await writer.write(encoder.encode(`data: ${JSON.stringify({ result })}\n\n`))
  }

  // Start processing in the background
  const processPromise = (async () => {
    try {
      await writeToStream('Starting WordPress migration...')

      const tenant = await getTenantFromCookie()

      if (!tenant) {
        await writeToStream('Error: Tenant is required')
        await writer.close()
        return
      }

      await writeToStream('Initializing Payload CMS...')
      const payload = await getPayload({ config: configPromise })
      const migrationService = new WordPressMigrationService(payload, tenant.id)

      let sqlContent: string

      // Check if the request contains a blobUrl (indicating Vercel Blob was used)
      const contentType = req.headers.get('content-type') || ''
      const isJsonRequest = contentType.includes('application/json')

      if (isJsonRequest) {
        // Handle Vercel Blob upload
        await writeToStream('Processing file from Blob storage...')
        const body = await req.json()
        const { blobUrl } = body

        if (!blobUrl) {
          await writeToStream('Error: Blob URL is required')
          await writer.close()
          return
        }

        // Fetch the SQL content from the blob URL
        await writeToStream('Downloading SQL content from Blob...')
        const response = await fetch(blobUrl)
        if (!response.ok) {
          await writeToStream('Error: Failed to fetch SQL content from Blob')
          await writer.close()
          return
        }

        sqlContent = await response.text()
        await writeToStream('SQL content downloaded successfully')

        // Optionally delete the blob after processing
        try {
          await del(blobUrl)
          await writeToStream('Blob deleted successfully')
        } catch (deleteError) {
          await writeToStream('Warning: Failed to delete blob, continuing with migration')
          console.error('Failed to delete blob:', deleteError)
          // Continue processing even if deletion fails
        }
      } else {
        // Handle direct file upload
        await writeToStream('Processing uploaded file...')
        const formData = await req.formData()
        const file = formData.get('file') as File | null

        if (!file) {
          await writeToStream('Error: SQL file is required')
          await writer.close()
          return
        }

        // Read the file content
        await writeToStream('Reading file content...')
        sqlContent = await file.text()
        await writeToStream('File content read successfully')
      }

      if (!sqlContent) {
        await writeToStream('Error: SQL content is empty')
        await writer.close()
        return
      }

      await writeToStream('Starting migration process...')

      // Parse the WordPress SQL content
      const posts = parseWordPressSQLInsert(sqlContent)
      await writeToStream(`Found ${posts.length} WordPress posts to process`)

      let successCount = 0
      let skipCount = 0
      let errorCount = 0
      const results: MigrationResult[] = []

      // Process posts one by one and stream results
      for (let i = 0; i < posts.length; i++) {
        const post: WordPressPost | undefined = posts[i]

        // Skip if post is undefined or not a post type
        if (!post || post.post_type !== 'post') {
          continue
        }

        try {
          const postTitle = post.post_title || 'Untitled'
          await writeToStream(`Processing post ${i + 1}/${posts.length}: "${postTitle}"`)

          // Check if a post with the same slug already exists
          const existingPosts = await payload.find({
            collection: 'posts',
            where: {
              and: [
                {
                  slug: {
                    equals: post.post_name,
                  },
                },
                {
                  tenant: {
                    equals: tenant.id,
                  },
                },
              ],
            },
          })

          let result: { skipped: boolean; existingId?: string; newId?: string }

          // If a post with the same slug exists, skip creation
          if (existingPosts.docs.length > 0 && existingPosts.docs[0]) {
            const existingPost = existingPosts.docs[0]
            result = {
              skipped: true,
              existingId: existingPost.id as string,
            }
          } else {
            // Use the migration service to process the post
            const processedResult = await migrationService.migrateFromSQL(JSON.stringify([post]))
            const processedPost = processedResult.results?.[0]

            result = {
              skipped: !!processedPost?.skipped,
              existingId: processedPost?.existingId,
              newId: processedPost?.newId,
            }
          }

          if (result.skipped) {
            skipCount++
            await writeResultToStream({
              success: true,
              id: post.ID,
              skipped: true,
              existingId: result.existingId,
              message: `Post "${postTitle}" already exists, skipped`,
            })
          } else {
            successCount++
            await writeResultToStream({
              success: true,
              id: post.ID,
              newId: result.newId,
              message: `Post "${postTitle}" imported successfully`,
            })
          }

          // Add to results array
          results.push({
            success: true,
            id: post.ID,
            newId: result.newId,
            skipped: result.skipped,
            existingId: result.existingId,
          })
        } catch (err) {
          const error = err as Error
          errorCount++
          const postTitle = post.post_title || 'Untitled'

          await writeResultToStream({
            success: false,
            id: post.ID,
            error: error.message,
            message: `Failed to import post "${postTitle}": ${error.message}`,
          })

          // Add to results array
          results.push({
            success: false,
            id: post.ID,
            error: error.message,
          })
        }
      }

      // Send final summary
      await writeResultToStream({
        summary: true,
        total: posts.length,
        success: successCount,
        skipped: skipCount,
        errors: errorCount,
        results,
        message: 'WordPress migration completed',
      })

      // Close the stream when done
      await writer.close()
    } catch (err) {
      const error = err as Error
      await writeToStream(`Error: Migration failed: ${error.message}`)
      console.error('Migration error:', error)
      await writer.close()
    }
  })()

  // Return a streaming response immediately
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
