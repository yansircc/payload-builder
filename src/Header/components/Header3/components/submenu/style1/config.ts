import { link } from '@/fields/link'
import { Field } from 'payload'

export const style1Submenu = [
  {
    type: 'row',
    fields: [
      {
        name: 'leftSection',
        type: 'group',
        admin: {
          width: '50%',
        },
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
      },
      {
        name: 'rightSection',
        type: 'group',
        admin: {
          width: '50%',
        },
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title of the sub menu',
            defaultValue: 'Solutions',
          },
          {
            name: 'links',
            type: 'array',
            fields: [
              link({
                name: 'link',
                disableLabel: true,
                ui: {
                  title: true,
                  description: true,
                  icons: true,
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
      },
    ],
  },
] as Field[]
