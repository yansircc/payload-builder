import type { NodeKey, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { DecoratorNode } from '@payloadcms/richtext-lexical/lexical'
import type { ReactElement } from 'react'

export type SerializedAICommandNode = SerializedLexicalNode

export class AICommandNode extends DecoratorNode<ReactElement> {
  static override getType(): string {
    return 'ai-command'
  }

  static override clone(node: AICommandNode): AICommandNode {
    return new AICommandNode(node.__key)
  }

  constructor(key?: NodeKey) {
    super(key)
  }

  override createDOM(): HTMLElement {
    const dom = document.createElement('span')
    dom.className = 'ai-command'
    return dom
  }

  override updateDOM(): false {
    return false
  }

  override decorate(): ReactElement {
    return <span className="ai-command">AI Command</span>
  }

  static override importJSON(): AICommandNode {
    return new AICommandNode()
  }

  override exportJSON(): SerializedAICommandNode {
    return {
      ...super.exportJSON(),
      type: 'ai-command',
      version: 1,
    }
  }
}
