import {
  DefaultNodeTypes,
  SerializedHeadingNode,
  SerializedParagraphNode,
} from '@payloadcms/richtext-lexical'
import { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export interface NodeStyle {
  type: 'heading' | 'paragraph' | 'list'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'ul' | 'ol'
  className: string
}

export function createRichTextConverter(
  styles: NodeStyle[]
): JSXConvertersFunction<DefaultNodeTypes> {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    paragraph: ({
      nodesToJSX,
      node,
    }: {
      nodesToJSX: (args: {
        nodes: SerializedLexicalNode[]
      }) => React.ReactNode[]
      node: SerializedParagraphNode
    }) => {
      const style = styles.find((s) => s.type === 'paragraph')
      return (
        <p className={style?.className || ''}>
          {nodesToJSX({ nodes: node.children })}
        </p>
      )
    },
    heading: ({
      nodesToJSX,
      node,
      childIndex,
      converters,
      parent,
    }: {
      nodesToJSX: (args: {
        nodes: SerializedLexicalNode[]
      }) => React.ReactNode[]
      node: SerializedHeadingNode
      childIndex: number
      converters: typeof defaultConverters
      parent: SerializedLexicalNode
    }) => {
      const style = styles.find(
        (s) => s.type === 'heading' && s.tag === node.tag
      )

      if (style?.tag) {
        const Component = style.tag
        return (
          <Component className={style.className}>
            {nodesToJSX({ nodes: node.children })}
          </Component>
        )
      }

      if (defaultConverters.heading) {
        return defaultConverters.heading({
          nodesToJSX,
          node,
          childIndex,
          converters,
          parent,
        })
      }

      return <div>{nodesToJSX({ nodes: node.children })}</div>
    },
  })
}
