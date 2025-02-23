import configPromise from '@payload-config'
import { JSDOM } from 'jsdom'
import { ObjectId } from 'mongodb'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'
import { getTenantFromCookie } from '@/utilities/getTenant'

interface WordPressPost {
  ID: string
  post_author: string
  post_date: string
  post_content: string
  post_title: string
  post_excerpt: string
  post_status: string
  post_name: string
  post_type: string
}

type RichTextFormat = '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
type RichTextDirection = 'ltr' | 'rtl' | null

interface LexicalBaseNode {
  [key: string]: unknown
  type: string
  format?: RichTextFormat | number
  indent?: number
  version: number
  direction?: RichTextDirection
}

interface LexicalTextNode extends LexicalBaseNode {
  type: 'text'
  detail: number
  mode: string
  style: string
  text: string
  format: RichTextFormat | number
}

interface LexicalParagraphNode extends LexicalBaseNode {
  type: 'paragraph'
  children: LexicalNode[]
  textFormat: number
}

interface LexicalHeadingNode extends LexicalBaseNode {
  type: 'heading'
  children: LexicalNode[]
  tag: string
}

interface LexicalLinkNode extends LexicalBaseNode {
  type: 'link'
  children: LexicalNode[]
  fields: {
    linkType: string
    newTab: boolean
    url: string
  }
}

interface LexicalBlockNode extends LexicalBaseNode {
  type: 'block'
  fields: {
    id: string
    style: 'success' | 'error'
    content: RichTextContent
    blockName: string
    blockType: string
  }
}

interface LexicalRootNode {
  type: 'root'
  children: LexicalNode[]
  direction: RichTextDirection
  format: RichTextFormat
  indent: number
  version: number
}

type LexicalNode =
  | LexicalTextNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalLinkNode
  | LexicalBlockNode

interface RichTextContent {
  [key: string]: unknown
  root: LexicalRootNode
}

function parseWordPressSQLInsert(sqlInsert: string): WordPressPost[] {
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

function isLexicalTextNode(node: LexicalNode): node is LexicalTextNode {
  return node.type === 'text'
}

function cleanWordPressContent(text: string): string {
  // If the text is just 'n' or multiple 'n' characters with optional whitespace, return empty string
  if (/^\s*n+\s*$/i.test(text)) {
    return ''
  }

  return text
    .replace(/\\n\\n\\n/g, ' ') // Replace triple escaped newlines
    .replace(/\\n\\n/g, ' ') // Replace double escaped newlines
    .replace(/\\n/g, ' ') // Replace single escaped newlines
    .replace(/\n\n\n/g, ' ') // Replace triple newlines
    .replace(/\n\n/g, ' ') // Replace double newlines
    .replace(/\n/g, ' ') // Replace single newlines
    .replace(/&#13;/g, ' ') // Replace HTML encoded carriage returns
    .replace(/&#10;/g, ' ') // Replace HTML encoded newlines
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/\r\n/g, ' ') // Replace Windows-style line endings
    .replace(/\r/g, ' ') // Replace carriage returns
    .replace(/\s+/g, ' ') // Normalize multiple spaces into single space
    .trim()
}

function parseHTMLToLexical(html: string): RichTextContent {
  const dom = new JSDOM(html)
  const doc = dom.window.document

  function convertNodeToLexical(node: Node): LexicalNode | null {
    if (node.nodeType === doc.TEXT_NODE) {
      const cleanedText = cleanWordPressContent(node.textContent || '')
      // Skip empty text nodes or nodes that were just 'n'
      if (!cleanedText) {
        return null
      }
      const textNode: LexicalTextNode = {
        type: 'text',
        detail: 0,
        format: '',
        mode: 'normal',
        style: '',
        text: cleanedText,
        version: 1,
      }
      // Wrap standalone text nodes in paragraph nodes
      const paragraphNode: LexicalParagraphNode = {
        type: 'paragraph',
        children: [textNode],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      }
      return paragraphNode
    }

    if (node.nodeType === doc.ELEMENT_NODE) {
      const element = node as Element
      const children = Array.from(node.childNodes)
        .map((n) => convertNodeToLexical(n as Node))
        .filter((n): n is LexicalNode => n !== null)

      switch (element.tagName.toLowerCase()) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          // Skip empty headings
          if (children.length === 0) {
            return null
          }
          const headingNode: LexicalHeadingNode = {
            type: 'heading',
            children,
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: element.tagName.toLowerCase(),
            version: 1,
          }
          return headingNode
        }
        case 'p': {
          // Check if the content is a [claim] shortcode
          const content = element.textContent || ''
          if (content.includes('[claim')) {
            // Extract claim attributes using regex
            const claimMatch = content.match(
              /\[claim claim="([^"]*)" istrue="([^"]*)" explanation="([^"]*)"[^\]]*\]/,
            )
            if (claimMatch) {
              const [, claim, istrueValue, explanation] = claimMatch
              const istrue = istrueValue?.toLowerCase() === 'true'
              const style = istrue ? 'success' : 'error'

              // Create block node for claim
              return {
                format: '',
                type: 'block',
                version: 2,
                fields: {
                  id: new ObjectId().toString(),
                  style: style,
                  content: {
                    root: {
                      children: [
                        {
                          children: [
                            {
                              detail: 0,
                              format: 1,
                              mode: 'normal',
                              style: '',
                              text: claim || '',
                              type: 'text',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          type: 'paragraph',
                          version: 1,
                          textFormat: 0,
                          textStyle: '',
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: explanation || '',
                              type: 'text',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          type: 'paragraph',
                          version: 1,
                          textFormat: 0,
                          textStyle: '',
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'root',
                      version: 1,
                    },
                  },
                  blockName: '',
                  blockType: 'banner',
                },
              }
            }
          }

          // Skip empty paragraphs or those that were just 'n'
          if (
            children.length === 0 ||
            (children.length === 1 &&
              isLexicalTextNode(children[0] as LexicalNode) &&
              !children[0]?.text)
          ) {
            return null
          }
          const paragraphNode: LexicalParagraphNode = {
            type: 'paragraph',
            children,
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          }
          return paragraphNode
        }
        case 'strong':
        case 'b': {
          if (!children.length) {
            return null
          }
          const child = children[0]
          if (child && isLexicalTextNode(child) && child.text) {
            const boldNode: LexicalTextNode = {
              type: 'text',
              detail: 0,
              mode: 'normal',
              style: '',
              text: cleanWordPressContent(child.text),
              format: '',
              version: 1,
            }
            return boldNode
          }
          return null
        }
        case 'em':
        case 'i': {
          if (!children.length) {
            return null
          }
          const child = children[0]
          if (child && isLexicalTextNode(child) && child.text) {
            const italicNode: LexicalTextNode = {
              type: 'text',
              detail: 0,
              mode: 'normal',
              style: '',
              text: cleanWordPressContent(child.text),
              format: '',
              version: 1,
            }
            return italicNode
          }
          return null
        }
        case 'a': {
          // Skip empty links
          if (children.length === 0) {
            return null
          }
          const linkNode: LexicalLinkNode = {
            type: 'link',
            children,
            direction: 'ltr',
            fields: {
              linkType: 'custom',
              newTab: true,
              url: element.getAttribute('href') || '',
            },
            format: '',
            indent: 0,
            version: 1,
          }
          return linkNode
        }
        default: {
          const cleanedText = cleanWordPressContent(element.textContent || '')
          // Skip empty nodes or those that were just 'n'
          if (!cleanedText && !children.length) {
            return null
          }
          // Always wrap content in paragraph nodes at the root level
          const paragraphNode: LexicalParagraphNode = {
            type: 'paragraph',
            children: children.length
              ? children
              : [
                  {
                    type: 'text',
                    detail: 0,
                    format: '',
                    mode: 'normal',
                    style: '',
                    text: cleanedText,
                    version: 1,
                  },
                ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          }
          return paragraphNode
        }
      }
    }

    return null
  }

  const bodyContent = Array.from(doc.body.childNodes)
    .map((n) => convertNodeToLexical(n as Node))
    .filter((n): n is LexicalNode => n !== null)

  // Ensure we always have at least one paragraph node
  if (bodyContent.length === 0) {
    bodyContent.push({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          detail: 0,
          format: '',
          mode: 'normal',
          style: '',
          text: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    })
  }

  const content: RichTextContent = {
    root: {
      type: 'root',
      children: bodyContent,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }

  return content
}

export async function POST(req: NextRequest) {
  const tenant = await getTenantFromCookie()
  try {
    const payload = await getPayload({ config: configPromise })

    // Handle file upload
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return new Response('SQL file is required', { status: 400 })
    }

    // Read the file content
    const sqlContent = await file.text()

    if (!sqlContent) {
      return new Response('SQL content is empty', { status: 400 })
    }

    const posts = parseWordPressSQLInsert(sqlContent)
    const results = []

    // Insert each post into Payload CMS
    for (const post of posts) {
      // Only process 'post' type content
      if (post.post_type === 'post') {
        try {
          const newPost = await payload.create({
            collection: 'posts',
            data: {
              title: post.post_title,
              content: parseHTMLToLexical(post.post_content),
              _status: 'published',
              slug: post.post_name,
              createdAt: new Date(post.post_date).toISOString(),
              tenant: tenant,
            },
          })
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

    return new Response(
      JSON.stringify({
        success: true,
        message: 'WordPress posts imported',
        results,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
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
