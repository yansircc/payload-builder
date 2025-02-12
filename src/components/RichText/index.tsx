import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { ColumnsBlock } from '@/blocks/ColumnBlock/RenderColumn'
import { CtaSimpleBlock } from '@/blocks/CtaSimpleBlock/RenderCtaSimple'
import { LinkBlock } from '@/blocks/Link/RenderLink'
import { ListBlock } from '@/blocks/List/RenderList'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PopupTriggerBlock } from '@/blocks/PopTriggerBlock/RenderTrigger'
import { TableBlock } from '@/blocks/Table/RenderTable'
import { VideoBlock } from '@/blocks/VideoBlock/RenderVideo'
import type {
  BannerBlock as BannerBlockProps,
  CTABlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  VideoBlock as VideoBlockProps,
} from '@/payload-types'
import {
  ColumnsBlock as ColumnsBlockProps,
  CtaSimpleBlock as CtaSimpleBlockProps,
  ListBlock as ListBlockProps,
  PopupTriggerBlock as PopupTriggerBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'
import { RenderCTA } from '../../blocks/CallToAction/RenderCTA'
import { LinkBlock as LinkBlockProps, TableBlock as TableBlockProps } from '../../payload-types'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | TableBlockProps
      | LinkBlockProps
      | ColumnsBlockProps
      | PopupTriggerBlockProps
      | VideoBlockProps
      | ListBlockProps
      | CtaSimpleBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <RenderCTA {...node.fields} />,
    table: ({ node }) => <TableBlock className="col-start-2" {...node.fields} />,
    link: ({ node }) => <LinkBlock className="col-start-2" {...node.fields} />,
    list: ({ node }) => <ListBlock className="col-start-2" {...node.fields} />,
    video: ({ node }) => <VideoBlock className="col-start-2" {...node.fields} />,
    columns: ({ node }) => <ColumnsBlock className="col-start-2" {...node.fields} />,
    ctaSimple: ({ node }) => <CtaSimpleBlock className="col-start-2" {...node.fields} />,
    popupTrigger: ({ node }) => {
      let parsedAttributes: Record<string, any> = {}

      if (typeof node.fields.customAttributes === 'string') {
        try {
          parsedAttributes = JSON.parse(node.fields.customAttributes)
        } catch (error) {
          console.error('Invalid JSON in customAttributes:', node.fields.customAttributes)
          parsedAttributes = {}
        }
      } else if (
        typeof node.fields.customAttributes === 'object' &&
        node.fields.customAttributes !== null
      ) {
        parsedAttributes = node.fields.customAttributes
      }

      return (
        <PopupTriggerBlock
          className="col-start-2"
          {...node.fields}
          customAttributes={parsedAttributes}
        />
      )
    }, //still failed
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
