import type { Field } from 'payload'

import * as fields from '@/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

const heroOptions = {
  none: 'None',
  highImpact: 'High Impact',
  hero1: 'Hero 1',
  hero7: 'Hero 7',
  hero8: 'Hero 8',
  hero12: 'Hero 12',
} as const

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: Object.entries(heroOptions).map(([value, label]) => ({
        label,
        value,
      })),
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    fields.richText(),
    fields.media(),
    fields.avatars(),
    fields.badge(),
    fields.features(),
    fields.partners(),
    fields.reviewStats(),
  ],
  label: false,
}
