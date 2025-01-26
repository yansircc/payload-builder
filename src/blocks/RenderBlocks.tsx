import React, { Fragment } from 'react'
import type { Page, GalleryBlock } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { galleryComponents } from '@/blocks/Gallery/components'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  gallery: (props: GalleryBlock) => {
    if (!props.style) return null
    const GalleryComponent = galleryComponents[props.style]
    if (!GalleryComponent) return null

    // Use type assertion to ensure type safety
    return <GalleryComponent {...(props[props.style] as any)} />
  },
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            return (
              <div className="my-16" key={index}>
                <Block {...(block as any)} disableInnerContainer />
              </div>
            )
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
