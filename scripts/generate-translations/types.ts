import type { Node, PropertySignature } from 'typescript'

// Basic translation type for language pairs
export interface Translation {
  en: string
  zh: string
}

// Collection translation interface
export interface CollectionTranslation {
  singular: Translation
  plural: Translation
  fields: {
    [key: string]: Translation
  }
}

// Main translation template interface
export interface TranslationTemplate {
  collections: {
    [key: string]: CollectionTranslation
  }
}

// Configuration information interface
export interface ConfigInfo {
  collections: string[]
  globals: string[]
  blocks: Set<string>
}

// Field processing options
export interface ProcessFieldsOptions {
  prefix?: string
  parentCollection?: string
  currentCollectionName?: string
}

// Interface name to collection name mapping
export interface InterfaceMapping {
  [key: string]: string
}

// Re-export TypeScript types
export type { Node, PropertySignature }
