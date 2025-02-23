import { JSDOM } from 'jsdom'
import { ObjectId } from 'mongodb'
import {
  LexicalHeadingNode,
  LexicalLinkNode,
  LexicalNode,
  LexicalParagraphNode,
  LexicalTextNode,
  RichTextContent,
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

export function parseHTMLToLexical(html: string): RichTextContent {
  const dom = new JSDOM(html)
  const doc = dom.window.document

  function convertNodeToLexical(node: Node): LexicalNode | null {
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

  const bodyContent = Array.from(doc.body.childNodes)
    .map((n) => convertNodeToLexical(n as Node))
    .filter((n): n is LexicalNode => n !== null)

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

  return {
    root: {
      type: 'root',
      children: bodyContent,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
