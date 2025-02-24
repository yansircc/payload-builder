'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { AIIcon, SummarizeIcon } from './icons'
import { AICommandNode } from './nodes/AICommandNode'

interface AIRequestPayload {
  prompt: string
  option: AIOption
  command?: string
}

type AIOption = 'continue' | 'shorter'

interface AIResponse {
  content: string
}

/**
 * Creates an error node in the editor with the specified error message
 */
function createErrorNode(selection: any, errorMessage: string) {
  const errorNode = $createTextNode(`Error: ${errorMessage}`)
  const errorParagraph = $createParagraphNode()
  errorParagraph.append(errorNode)
  selection.insertNodes([errorParagraph])
}

/**
 * Processes the streaming response from the AI API
 */
async function processStreamingResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  editor: LexicalEditor,
): Promise<string> {
  const decoder = new TextDecoder()
  let accumulatedText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(5)) as AIResponse
          if (data.content) {
            accumulatedText += data.content
            editor.update(() => {
              const selection = $getSelection()
              if ($isRangeSelection(selection)) {
                const textNode = $createTextNode(data.content)
                selection.insertNodes([textNode])
              }
            })
          }
        } catch (e) {
          console.error('Error parsing SSE data:', e)
        }
      }
    }
  }

  return accumulatedText
}

/**
 * Makes a streaming request to the AI API and updates the editor with the response
 */
async function streamingAIRequest(
  editor: LexicalEditor,
  prompt: string,
  option: AIOption,
  command?: string,
): Promise<string> {
  try {
    const payload: AIRequestPayload = { prompt, option, command }
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    if (!response.body) {
      throw new Error('No response body received')
    }

    return await processStreamingResponse(response.body.getReader(), editor)
  } catch (error) {
    console.error('Error calling AI API:', error)
    throw error
  }
}

/**
 * Gets the content from the previous line relative to the current node
 */
function getPreviousLineContent(currentNode: any): string {
  let prevNode = currentNode.getPreviousSibling()

  // If no previous sibling, try to get the last child of the previous parent
  if (!prevNode) {
    const parentNode = currentNode.getParent()
    if (parentNode) {
      prevNode = parentNode.getPreviousSibling()
      if (prevNode) {
        const lastChild = prevNode.getLastChild()
        if (lastChild) {
          prevNode = lastChild
        }
      }
    }
  }

  return prevNode ? prevNode.getTextContent() : ''
}

/**
 * Gets the text content based on the current selection or editor state
 */
function getEditorContent(selection: any, shouldGetAllContent = false): string {
  if (!shouldGetAllContent && selection.isCollapsed()) {
    const currentNode = selection.anchor.getNode()
    const currentText = currentNode.getTextContent()

    // If current line is empty, get content from previous line
    if (!currentText || currentText.trim() === '') {
      const previousContent = getPreviousLineContent(currentNode)
      return previousContent
    }
    return currentText
  }

  if (!shouldGetAllContent) {
    const selectedText = selection.getTextContent()
    if (selectedText && selectedText.trim() !== '') {
      return selectedText
    }
  }

  return $getRoot().getTextContent()
}

/**
 * Handles AI feature errors by displaying them in the editor
 */
function handleAIError(editor: LexicalEditor, selection: any, error: Error, context: string) {
  console.error(`Error in AI ${context}:`, error)
  editor.update(() => {
    createErrorNode(selection, error.message || `Failed to ${context}. Please try again.`)
  })
}

export const AIFeature = createClientFeature({
  nodes: [AICommandNode],
  slashMenu: {
    groups: [
      {
        key: 'ai-tools',
        label: 'AI Tools',
        items: [
          {
            key: 'keep-writing',
            label: 'Keep writing',
            Icon: AIIcon,
            keywords: ['ai', 'artificial intelligence', 'gpt', 'continue'],
            onSelect: async ({ editor }: { editor: LexicalEditor }) => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  const textContent = getEditorContent(selection)
                  if (textContent) {
                    streamingAIRequest(editor, textContent, 'continue').catch((error) => {
                      handleAIError(editor, selection, error, 'generation')
                    })
                  }
                }
              })
            },
          },
          {
            key: 'summarize',
            label: 'Summarize',
            Icon: SummarizeIcon,
            keywords: ['ai', 'artificial intelligence', 'gpt', 'shorter'],
            onSelect: async ({ editor }: { editor: LexicalEditor }) => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  const textContent = getEditorContent(selection, true)
                  if (textContent) {
                    streamingAIRequest(editor, textContent, 'shorter').catch((error) => {
                      handleAIError(editor, selection, error, 'summarization')
                    })
                  }
                }
              })
            },
          },
        ],
      },
    ],
  },
})
