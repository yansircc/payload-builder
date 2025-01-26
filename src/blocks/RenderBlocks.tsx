import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { RenderCTO } from '@/blocks/CallToAction/RenderCTO'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: RenderCTO,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

type BlockType = keyof typeof blockComponents

interface BaseBlock {
  id?: string | null
  blockType: string
}

interface RenderBlocksProps {
  blocks: (BaseBlock & Record<string, any>)[]
}

// 渲染单个区块的函数
function renderBlock(block: BaseBlock & Record<string, any>, index: number) {
  const { blockType, id, ...restProps } = block

  if (!blockType || !(blockType in blockComponents)) {
    return null
  }

  const blockKey = id || index
  const className = "my-16"

  switch (blockType) {
    case 'cta':
      return (
        <div key={blockKey} className={className}>
          <RenderCTO 
            blockType="cta"
            type={restProps.type || 'cta1'} 
            cta1={restProps.cta1}
            {...restProps} 
          />
        </div>
      )
    case 'archive':
      return (
        <div key={blockKey} className={className}>
          <ArchiveBlock blockType="archive" {...restProps} />
        </div>
      )
    case 'content':
      return (
        <div key={blockKey} className={className}>
          <ContentBlock blockType="content" {...restProps} />
        </div>
      )
    case 'formBlock':
      if (!restProps.form) return null
      return (
        <div key={blockKey} className={className}>
          <FormBlock
            blockType="formBlock"
            enableIntro={!!restProps.enableIntro}
            form={restProps.form}
            {...restProps}
          />
        </div>
      )
    case 'mediaBlock':
      if (!restProps.media) return null
      return (
        <div key={blockKey} className={className}>
          <MediaBlock
            blockType="mediaBlock"
            media={restProps.media}
            {...restProps}
          />
        </div>
      )
    default:
      return null
  }
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block) => (
        <div key={block.id || Math.random()}>{renderBlock(block, 0)}</div>
      ))}
    </Fragment>
  )
}
