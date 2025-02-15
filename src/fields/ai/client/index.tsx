'use client'

// import type { defaultEditorFeatures } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
} from '@payloadcms/richtext-lexical/lexical'
import { SwapIcon } from '@payloadcms/ui/icons/Swap'
import { SparklesIcon } from 'lucide-react'
import { AICommandNode } from './nodes/AICommandNode'

interface AIClientFeatureProps {
  // Add any client-side props you want to receive from the server
}

export const AIFeature = createClientFeature({
  // nodes: [AICommandNode],
  slashMenu: {
    groups: [
      {
        key: 'ai-tools',
        label: 'AI Tools',
        items: [
          {
            key: 'continue-writing',
            label: 'Continue writing',
            Icon: SparklesIcon,
            keywords: ['ai', 'artificial intelligence', 'gpt'],
            onSelect: ({ editor }: { editor: LexicalEditor }) => {
              editor.update(() => {
                const selection = $getSelection()
                if (selection) {
                  const aiNode = new AICommandNode()
                  const paragraphNode = $createParagraphNode()
                  paragraphNode.append(aiNode)
                  $insertNodes([paragraphNode])
                }
              })
            },
          },
        ],
      },
    ],
  },
})
