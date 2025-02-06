import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { RichTextField } from 'payload'

const baseRichText: RichTextField = {
  name: 'richText',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ]
    },
  }),
  label: false,
}

export default function createRichTextField(types?: string[]): RichTextField {
  if (!types) return baseRichText

  return {
    ...baseRichText,
    admin: {
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
