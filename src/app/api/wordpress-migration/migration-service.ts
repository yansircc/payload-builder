import { Payload } from 'payload'
import { parseHTMLToLexical } from './lexical-converter'
import { MigrationResult, WordPressPost } from './types'
import { parseWordPressSQLInsert } from './wordpress-parser'

export class WordPressMigrationService {
  constructor(
    private readonly payload: Payload,
    private readonly tenant: string,
  ) {}

  async migrateFromSQL(sqlContent: string): Promise<{
    success: boolean
    message: string
    results: MigrationResult[]
  }> {
    try {
      const posts = parseWordPressSQLInsert(sqlContent)
      const results: MigrationResult[] = []

      for (const post of posts) {
        if (post.post_type === 'post') {
          try {
            const result = await this.createPost(post)

            if (result.skipped) {
              results.push({
                success: true,
                id: post.ID,
                skipped: true,
                existingId: result.existingId,
              })
            } else {
              results.push({
                success: true,
                id: post.ID,
                newId: result.newId,
              })
            }
          } catch (err) {
            const error = err as Error
            results.push({
              success: false,
              id: post.ID,
              error: error.message,
            })
          }
        }
      }

      return {
        success: true,
        message: 'WordPress posts imported',
        results,
      }
    } catch (err) {
      const error = err as Error
      throw new Error(`Migration failed: ${error.message}`)
    }
  }

  private async createPost(post: WordPressPost): Promise<{
    skipped: boolean
    existingId?: string
    newId?: string
  }> {
    // Check if a post with the same slug already exists
    const existingPosts = await this.payload.find({
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
              equals: this.tenant,
            },
          },
        ],
      },
    })

    // If a post with the same slug exists, skip creation
    if (existingPosts.docs.length > 0 && existingPosts.docs[0]) {
      const existingPost = existingPosts.docs[0]
      return {
        skipped: true,
        existingId: existingPost.id as string,
      }
    }

    // Create new post if no duplicate found
    const newPost = await this.payload.create({
      collection: 'posts',
      data: {
        title: post.post_title,
        content: await parseHTMLToLexical(post.post_content),
        _status: 'published',
        slug: post.post_name,
        createdAt: new Date(post.post_date).toISOString(),
        tenant: this.tenant,
      },
    })

    return {
      skipped: false,
      newId: newPost.id as string,
    }
  }
}
