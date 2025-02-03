import { link } from '@/fields/link'
import { Field } from 'payload'

export const style4Submenu = [
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
            label: 'Title of section',
          },
          {
            name: 'links',
            type: 'array',
            fields: [
              link({
                name: 'link',
                disableLabel: true,
                appearances: false,
                ui: {
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
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title of the section',
          },
          {
            name: 'links',
            type: 'array',
            fields: [
              link({
                name: 'link',
                disableLabel: true,
                appearances: false,
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
          },
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
] as Field[]
