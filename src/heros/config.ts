import type { Field } from 'payload'

import * as fields from '@/fields'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Hero 1', value: 'hero1' },
        { label: 'Hero 7', value: 'hero7' },
        { label: 'Hero 8', value: 'hero8' },
        { label: 'Hero 12', value: 'hero12' },
        { label: 'Hero 24', value: 'hero24' },
        { label: 'Hero 34', value: 'hero34' },
      ],
      required: true,
    },
    fields.linkGroup({
      maxRows: 2,
      appearances: ['default', 'outline', 'ghost'],
    }),
    fields.richText(),
    fields.media(),
    fields.avatars(['hero7']),
    fields.reviewStats(['hero7']),
    fields.badge(),
    fields.features(['hero24']),
    fields.partners(),
  ],
  label: false,
}
