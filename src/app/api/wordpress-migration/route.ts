import configPromise from '@payload-config'
import { del } from '@vercel/blob'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'
import { getTenantFromCookie } from '@/utilities/getTenant'
import { WordPressMigrationService } from './migration-service'

export const maxDuration = 300

export async function POST(req: NextRequest) {
  try {
    const tenant = await getTenantFromCookie()

    if (!tenant) {
      return new Response('Tenant is required', { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const migrationService = new WordPressMigrationService(payload, tenant.id)

    let sqlContent: string

    // Check if the request contains a blobUrl (indicating Vercel Blob was used)
    const contentType = req.headers.get('content-type') || ''
    const isJsonRequest = contentType.includes('application/json')

    if (isJsonRequest) {
      // Handle Vercel Blob upload
      const body = await req.json()
      const { blobUrl } = body

      if (!blobUrl) {
        return new Response('Blob URL is required', { status: 400 })
      }

      // Fetch the SQL content from the blob URL
      const response = await fetch(blobUrl)
      if (!response.ok) {
        return new Response('Failed to fetch SQL content from Blob', { status: 500 })
      }

      sqlContent = await response.text()

      // Optionally delete the blob after processing
      try {
        await del(blobUrl)
      } catch (deleteError) {
        console.error('Failed to delete blob:', deleteError)
        // Continue processing even if deletion fails
      }
    } else {
      // Handle direct file upload
      const formData = await req.formData()
      const file = formData.get('file') as File | null

      if (!file) {
        return new Response('SQL file is required', { status: 400 })
      }

      // Read the file content
      sqlContent = await file.text()
    }

    if (!sqlContent) {
      return new Response('SQL content is empty', { status: 400 })
    }

    const result = await migrationService.migrateFromSQL(sqlContent)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    const error = err as Error
    console.error('Migration error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
