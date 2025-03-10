import { WordPressPost } from './types'

export function parseWordPressSQLInsert(sqlInsert: string): WordPressPost[] {
  const posts: WordPressPost[] = []

  // Extract values between INSERT INTO `wp_posts` VALUES(...) statements
  const valuesRegex = /VALUES\s*\(([\s\S]*?)\);/g
  const matches = sqlInsert.matchAll(valuesRegex)

  for (const match of matches) {
    if (match[1]) {
      const values: string[] = []
      let currentValue = ''
      let insideQuote = false
      let quoteChar = ''
      let escaped = false

      // Parse character by character to handle quotes and escapes properly
      for (let i = 0; i < match[1].length; i++) {
        const char = match[1][i]

        if (escaped) {
          currentValue += char
          escaped = false
          continue
        }

        if (char === '\\') {
          escaped = true
          continue
        }

        if ((char === "'" || char === '"') && !insideQuote) {
          insideQuote = true
          quoteChar = char
          continue
        }

        if (char === quoteChar && insideQuote) {
          insideQuote = false
          continue
        }

        if (char === ',' && !insideQuote) {
          values.push(currentValue)
          currentValue = ''
          continue
        }

        currentValue += char
      }

      // Push the last value
      if (currentValue) {
        values.push(currentValue)
      }

      // Clean up values (trim whitespace)
      const cleanValues = values.map((val) => val.trim())

      // Only create post if we have all required values
      if (cleanValues.length >= 21) {
        const post: WordPressPost = {
          ID: cleanValues[0] || '',
          post_author: cleanValues[1] || '',
          post_date: cleanValues[2] || '',
          post_content: cleanValues[4] || '',
          post_title: cleanValues[5] || '',
          post_excerpt: cleanValues[6] || '',
          post_status: cleanValues[7] || '',
          post_name: cleanValues[11] || '',
          post_type: cleanValues[20] || '',
        }
        posts.push(post)
      }
    }
  }

  return posts
}
