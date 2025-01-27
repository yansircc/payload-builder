import React, { Fragment } from 'react'
import type { Page, GalleryBlock } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { RenderCTA } from '@/blocks/CallToAction/RenderCTA'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { galleryComponents } from '@/blocks/Gallery/components'

interface BaseBlock {
  id?: string | null
  blockType: string
}

interface RenderBlocksProps {
  blocks: (BaseBlock & Record<string, any>)[]
}

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: RenderCTA,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  gallery: (props: GalleryBlock) => {
    if (!props.style) return null
    const GalleryComponent = galleryComponents[props.style]
    if (!GalleryComponent) return null
    return <GalleryComponent {...(props[props.style] as any)} />
  },
}

function renderBlock(block: BaseBlock & Record<string, any>, index: number) {
  const { blockType, id, ...restProps } = block
  const blockKey = id || index
  const className = "my-16"

  switch (blockType) {
    case 'cta':
      return (
        <div key={blockKey} className={className}>
          <RenderCTA
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
    case 'gallery':
      return (
        <div key={blockKey} className={className}>
          {blockComponents.gallery(block as GalleryBlock)}
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
      {blocks.map((block, index) => renderBlock(block, index))}
    </Fragment>
  )
}
