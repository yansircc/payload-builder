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
            const newPost = await this.createPost(post)
            results.push({
              success: true,
              id: post.ID,
              newId: newPost.id,
            })
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

  private async createPost(post: WordPressPost) {
    return this.payload.create({
      collection: 'posts',
      data: {
        title: post.post_title,
        content: parseHTMLToLexical(post.post_content),
        _status: 'published',
        slug: post.post_name,
        createdAt: new Date(post.post_date).toISOString(),
        tenant: this.tenant,
      },
    })
  }
}
