export interface WordPressPost {
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

export interface LexicalBaseNode {
  [key: string]: unknown
  type: string
  format?: RichTextFormat | number
  indent?: number
  version: number
  direction?: RichTextDirection
}

export interface LexicalTextNode extends LexicalBaseNode {
  type: 'text'
  detail: number
  mode: string
  style: string
  text: string
  format: RichTextFormat | number
}

export interface LexicalParagraphNode extends LexicalBaseNode {
  type: 'paragraph'
  children: LexicalNode[]
  textFormat: number
}

export interface LexicalHeadingNode extends LexicalBaseNode {
  type: 'heading'
  children: LexicalNode[]
  tag: string
}

export interface LexicalLinkNode extends LexicalBaseNode {
  type: 'link'
  children: LexicalNode[]
  fields: {
    linkType: string
    newTab: boolean
    url: string
  }
}

export interface LexicalBlockNode extends LexicalBaseNode {
  type: 'block'
  fields: {
    id: string
    style: 'success' | 'error'
    content: RichTextContent
    blockName: string
    blockType: string
  }
}

export interface LexicalRootNode {
  type: 'root'
  children: LexicalNode[]
  direction: RichTextDirection
  format: RichTextFormat
  indent: number
  version: number
}

export type LexicalNode =
  | LexicalTextNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalLinkNode
  | LexicalBlockNode

export interface RichTextContent {
  [key: string]: unknown
  root: LexicalRootNode
}

export interface MigrationResult {
  success: boolean
  id: string
  newId?: string
  error?: string
  skipped?: boolean
  existingId?: string
}

export interface UploadFile {
  name: string
  data: Buffer
  mimetype: string
  size: number
}

export interface ImageNode {
  type: 'image'
  src: string
  alt: string
}
