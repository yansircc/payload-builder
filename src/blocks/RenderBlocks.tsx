import React, { Fragment } from 'react'
import { RenderAbout } from '@/blocks/About/RenderAbout'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { RenderCTA } from '@/blocks/CallToAction/RenderCTA'
import { RenderContact } from '@/blocks/Contact/RenderContact'
import { ContentBlock } from '@/blocks/Content/Component'
import { RenderFAQ } from '@/blocks/FAQ/RenderFAQ'
import { RenderFeature } from '@/blocks/Feature/RenderFeature'
import { FormBlock } from '@/blocks/Form/Component'
import { RenderGallery } from '@/blocks/Gallery/RenderGallery'
import { RenderLogos } from '@/blocks/Logos/RenderLogos'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RenderTeam } from '@/blocks/Team/RenderTeam'
import { RenderTestimonial } from '@/blocks/Testimonial/RenderTestimonial'
import type { Page } from '@/payload-types'
import { ColumnsBlock } from './ColumnBlock/RenderColumn'
import { CtaSimpleBlock } from './CtaSimpleBlock/RenderCtaSimple'
import { LinkBlock } from './Link/RenderLink'
import { ListBlock } from './List/RenderList'
import { PopupTriggerBlock } from './PopTriggerBlock/RenderTrigger'
import { TableBlock } from './Table/RenderTable'
import { VideoBlock } from './VideoBlock/RenderVideo'

const blockComponents = {
  about: RenderAbout,
  archive: ArchiveBlock,
  content: ContentBlock,
  table: TableBlock,
  link: LinkBlock,
  cta: RenderCTA,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  feature: RenderFeature,
  gallery: RenderGallery,
  testimonial: RenderTestimonial,
  contact: RenderContact,
  team: RenderTeam,
  faq: RenderFAQ,
  logos: RenderLogos,
  columns: ColumnsBlock,
  popupTrigger: PopupTriggerBlock,
  video: VideoBlock,
  list: ListBlock,
  ctaSimple: CtaSimpleBlock,
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
