import { link } from '@/fields/link'
import { Field } from 'payload'

export const style3Submenu = [
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
            label: 'Title of links',
          },
          {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Description of the links',
          },
          {
            name: 'links',
            type: 'array',
            fields: [
              link({
                name: 'link',
                ui: {
                  icons: false,
                },
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
          {
            name: 'links',
            type: 'array',
            fields: [
              link({
                name: 'link',
                disableLabel: true,
                ui: {
                  image: true,
                  title: true,
                  description: true,
                },
                overrides: {
                  defaultValue: {
                    appearance: 'link',
                  },
                },
              }),
            ],
            minRows: 0,
            maxRows: 2,
          },
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
] as Field[]
