import configPromise from '@payload-config'
import { JSDOM } from 'jsdom'
import { ObjectId } from 'mongodb'
import { getPayload } from 'payload'
import { getTenantFromCookie } from '@/utilities/getTenant'
import {
  ImageNode,
  LexicalBlockNode,
  LexicalHeadingNode,
  LexicalLinkNode,
  LexicalNode,
  LexicalParagraphNode,
  LexicalTextNode,
  RichTextContent,
  UploadFile,
} from './types'

function cleanWordPressContent(text: string): string {
  // If the text is just 'n' or multiple 'n' characters with optional whitespace, return empty string
  if (/^\s*n+\s*$/i.test(text)) {
    return ''
  }

  return text
    .replace(/\\n\\n\\n/g, ' ')
    .replace(/\\n\\n/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/\n\n\n/g, ' ')
    .replace(/\n\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/&#13;/g, ' ')
    .replace(/&#10;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isLexicalTextNode(node: LexicalNode): node is LexicalTextNode {
  return node.type === 'text'
}

async function fetchFileByURL(url: string): Promise<UploadFile> {
  const res = await fetch(url, { credentials: 'include', method: 'GET' })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  // Get the extension from the URL or default to jpg
  const extension = url.split('.').pop()?.toLowerCase() || 'jpg'

  // Generate random filename: timestamp + 6 random chars + extension
  const randomStr = Math.random().toString(36).substring(2, 8)
  const filename = `${Date.now()}-${randomStr}.${extension}`

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: `image/${extension}`,
    size: data.byteLength,
  }
}

async function processImageNode(node: ImageNode): Promise<LexicalBlockNode> {
  try {
    const tenant = await getTenantFromCookie()
    const payload = await getPayload({ config: configPromise })

    const file = await fetchFileByURL(node.src)

    const media = await payload.create({
      collection: 'media',
      data: {
        tenant: tenant,
        alt: node.alt,
      },
      file: file,
    })

    const mediaBlock = {
      type: 'block',
      version: 2,
      format: '',
      fields: {
        id: new ObjectId().toString(),
        media: media.id,
        blockName: '',
        blockType: 'mediaBlock',
      },
    } as any

    return mediaBlock
  } catch (error) {
    console.error('Failed to process image:', error)
    throw error // Let the error propagate up to be handled by the caller
  }
}

export async function parseHTMLToLexical(html: string): Promise<RichTextContent> {
  const dom = new JSDOM(html)
  const doc = dom.window.document

  async function convertNodeToLexical(node: Node): Promise<LexicalNode | null> {
    if (node.nodeType === doc.TEXT_NODE) {
      const cleanedText = cleanWordPressContent(node.textContent || '')
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

      const childPromises = Array.from(node.childNodes).map((n) => convertNodeToLexical(n as Node))
      const children = (await Promise.all(childPromises)).filter(
        (n): n is LexicalNode => n !== null,
      )

      switch (element.tagName.toLowerCase()) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
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
          const content = element.textContent || ''
          if (content.includes('[claim')) {
            const claimMatch = content.match(
              /\[claim claim="([^"]*)" istrue="([^"]*)" explanation="([^"]*)"[^\]]*\]/,
            )
            if (claimMatch) {
              const [, claim, istrueValue, explanation] = claimMatch
              const istrue = istrueValue?.toLowerCase() === 'true'
              const style = istrue ? 'success' : 'error'

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
        case 'img': {
          const src = element.getAttribute('src')
          const alt = element.getAttribute('alt') || ''

          if (!src) return null

          const imageNode: ImageNode = {
            type: 'image',
            src,
            alt,
          }
          try {
            const result = await processImageNode(imageNode)
            return result
          } catch (error) {
            console.error('Failed to process image:', src, error)
            return null
          }
        }
        default: {
          const cleanedText = cleanWordPressContent(element.textContent || '')
          if (!cleanedText && !children.length) {
            return null
          }
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

  const bodyContentPromises = Array.from(doc.body.childNodes).map((n) =>
    convertNodeToLexical(n as Node),
  )
  const bodyContent = (await Promise.all(bodyContentPromises)).filter(
    (n): n is LexicalNode => n !== null,
  )

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

  const result: RichTextContent = {
    root: {
      type: 'root' as const,
      children: bodyContent,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
  return result
}
