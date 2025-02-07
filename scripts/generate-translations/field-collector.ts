import ts from 'typescript'
import type { Node, PropertySignature } from 'typescript'
import type { InterfaceMapping, ProcessFieldsOptions, TranslationTemplate } from './types'

/**
 * Extract description from JSDoc comments
 */
export function getJSDocDescription(node: Node, sourceFile: ts.SourceFile): string | undefined {
  const jsDoc = ts.getJSDocTags(node)
  let description: string | undefined

  // Try to get description tag first
  const descriptionTag = jsDoc.find((tag) => tag.tagName.getText() === 'description')
  const tagComment = descriptionTag?.comment
  if (tagComment) {
    description =
      typeof tagComment === 'string' ? tagComment : tagComment.map((part) => part.text).join('')
  }

  // If no description tag, try to get main comment
  if (!description) {
    const comments = ts.getLeadingCommentRanges(sourceFile.getFullText(), node.getFullStart())
    const lastComment = comments?.[comments.length - 1]
    if (lastComment) {
      const commentText = sourceFile
        .getFullText()
        .slice(lastComment.pos, lastComment.end)
        .replace(/\/\*\*|\*\/|\*/g, '')
        .trim()
      if (commentText) {
        description = commentText
      }
    }
  }

  return description
}

/**
 * Process fields and add them to the template
 */
export function processFields(
  member: PropertySignature,
  template: TranslationTemplate,
  sourceFile: ts.SourceFile,
  options: ProcessFieldsOptions = {},
): void {
  const { prefix = '', parentCollection, currentCollectionName } = options
  const fieldName = member.name.getText().replace(/['"]/g, '')
  const fullFieldName = prefix ? `${prefix}.${fieldName}` : fieldName
  const targetCollection = parentCollection || currentCollectionName

  if (!targetCollection) return

  // Get field description
  let description = getJSDocDescription(member, sourceFile)

  // If no JSDoc comment, use field name as default description
  if (!description && !['id', 'updatedAt', 'createdAt', 'blockType'].includes(fieldName)) {
    // Convert camel case to space-separated words
    description = fieldName
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .trim()
      // Capitalize first letter
      .replace(/^[a-z]/, (str) => str.toUpperCase())
  }

  if (!['id', 'updatedAt', 'createdAt', 'blockType'].includes(fieldName)) {
    if (!template.collections[targetCollection]) {
      template.collections[targetCollection] = {
        singular: { en: '', zh: '' },
        plural: { en: '', zh: '' },
        fields: {},
      }
    }

    template.collections[targetCollection]!.fields[fullFieldName] = {
      en: description || fieldName,
      zh: '',
    }
  }

  // Process nested fields
  if (member.type) {
    if (ts.isTypeLiteralNode(member.type)) {
      member.type.members.forEach((nestedMember) => {
        if (ts.isPropertySignature(nestedMember)) {
          processFields(nestedMember, template, sourceFile, {
            prefix: fullFieldName,
            parentCollection: targetCollection,
            currentCollectionName,
          })
        }
      })
    } else if (ts.isArrayTypeNode(member.type)) {
      const elementType = member.type.elementType
      if (ts.isTypeLiteralNode(elementType)) {
        elementType.members.forEach((nestedMember) => {
          if (ts.isPropertySignature(nestedMember)) {
            processFields(nestedMember, template, sourceFile, {
              prefix: `${fullFieldName}[]`,
              parentCollection: targetCollection,
              currentCollectionName,
            })
          }
        })
      } else if (ts.isUnionTypeNode(elementType)) {
        elementType.types.forEach((type) => {
          if (ts.isTypeLiteralNode(type)) {
            type.members.forEach((nestedMember) => {
              if (ts.isPropertySignature(nestedMember)) {
                processFields(nestedMember, template, sourceFile, {
                  prefix: `${fullFieldName}[]`,
                  parentCollection: targetCollection,
                  currentCollectionName,
                })
              }
            })
          }
        })
      }
    } else if (ts.isUnionTypeNode(member.type)) {
      member.type.types.forEach((type) => {
        if (ts.isTypeLiteralNode(type)) {
          type.members.forEach((nestedMember) => {
            if (ts.isPropertySignature(nestedMember)) {
              processFields(nestedMember, template, sourceFile, {
                prefix: fullFieldName,
                parentCollection: targetCollection,
                currentCollectionName,
              })
            }
          })
        }
      })
    }
  }
}

/**
 * Collect interfaces and blocks
 */
export function collectInterfacesAndBlocks(
  sourceFile: ts.SourceFile,
  configInfo: { collections: string[]; globals: string[] },
): {
  interfaceToCollection: InterfaceMapping
  blockInterfaces: Set<string>
} {
  const interfaceToCollection: InterfaceMapping = {}
  const blockInterfaces = new Set<string>()

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text

      // Map collection interfaces
      configInfo.collections.forEach((collName) => {
        if (
          interfaceName === `${collName}Config` ||
          interfaceName === collName ||
          interfaceName === collName.replace(/s$/, '') ||
          interfaceName === `${collName.replace(/s$/, '')}s`
        ) {
          interfaceToCollection[interfaceName] = collName.toLowerCase()
        }
      })

      // Map global interfaces
      configInfo.globals.forEach((globalName) => {
        if (
          interfaceName === `${globalName}Config` ||
          interfaceName === globalName ||
          interfaceName === globalName.replace(/s$/, '') ||
          interfaceName === `${globalName.replace(/s$/, '')}s`
        ) {
          interfaceToCollection[interfaceName] = globalName.toLowerCase()
        }
      })

      // Collect block interfaces
      if (
        interfaceName.endsWith('Fields') ||
        interfaceName.endsWith('Block') ||
        interfaceName.includes('Layout')
      ) {
        blockInterfaces.add(interfaceName)
      }

      // Find layout field definitions
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.type) {
          if (member.name.getText() === 'layout' || member.name.getText() === 'blocks') {
            if (ts.isArrayTypeNode(member.type)) {
              const elementType = member.type.elementType
              if (ts.isUnionTypeNode(elementType)) {
                elementType.types.forEach((type) => {
                  if (ts.isTypeReferenceNode(type)) {
                    blockInterfaces.add(type.typeName.getText())
                  }
                })
              }
            }
          }
        }
      })
    }
  }

  ts.forEachChild(sourceFile, visit)
  return { interfaceToCollection, blockInterfaces }
}

/**
 * Collect fields from all interfaces
 */
export function collectFields(
  sourceFile: ts.SourceFile,
  template: TranslationTemplate,
  interfaceToCollection: InterfaceMapping,
  blockInterfaces: Set<string>,
): void {
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text
      const collectionName = interfaceToCollection[interfaceName]

      // Process block fields
      if (blockInterfaces.has(interfaceName)) {
        const blockName = interfaceName.replace(/(?:Fields|Block|Config)$/, '').toLowerCase()
        if (!template.collections.pages) {
          template.collections.pages = {
            singular: { en: '', zh: '' },
            plural: { en: '', zh: '' },
            fields: {},
          }
        }

        node.members.forEach((member) => {
          if (ts.isPropertySignature(member)) {
            processFields(member, template, sourceFile, {
              prefix: blockName,
              parentCollection: 'pages',
              currentCollectionName: collectionName,
            })
          }
        })
      }

      // Process collection fields
      if (collectionName) {
        if (!template.collections[collectionName]) {
          template.collections[collectionName] = {
            singular: { en: '', zh: '' },
            plural: { en: '', zh: '' },
            fields: {},
          }
        }

        node.members.forEach((member) => {
          if (ts.isPropertySignature(member)) {
            processFields(member, template, sourceFile, {
              parentCollection: collectionName,
              currentCollectionName: collectionName,
            })
          }
        })
      }
    }
  }

  ts.forEachChild(sourceFile, visit)
}
