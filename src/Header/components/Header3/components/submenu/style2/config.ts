import { link } from '@/fields/link'
import { Field } from 'payload'

export const style2Submenu = [
  {
    type: 'row',
    fields: [
      {
        name: 'leftSection',
        label: 'Left section',
        type: 'group',
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title of the sub menu',
            defaultValue: 'Use Cases',
          },
          {
            name: 'links',
            type: 'array',
            fields: [
              link({
                name: 'link',
                overrides: {
                  defaultValue: {
                    appearance: 'link',
                  },
                },
              }),
            ],
            minRows: 0,
            maxRows: 5,
          },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'rightSection',
        label: 'Right section',
        type: 'group',
        fields: [
          link({
            name: 'link',
            disableLabel: true,
            appearances: false,
            ui: {
              image: true,
              title: true,
              subtitle: true,
              description: true,
            },
          }),
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
] as Field[]
