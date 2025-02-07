import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { cardsFields, contactSchemas, createContactField } from '../shared/base-field'

/**
 * Contact 3 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  subtitle: contactSchemas.subtitle,
  links: z.array(
    z.object({
      'link-1': z.object({
        label: z.string(),
        href: z.string().optional(),
      }),
      'link-2': z.object({
        label: z.string(),
        href: z.string().optional(),
      }),
    }),
  ),
  supportList: z.object({
    title: contactSchemas.title,
    supports: z.array(
      z.object({
        image: contactSchemas.image,
        title: contactSchemas.title,
        subtitle: contactSchemas.subtitle,
        link: z.object({
          label: z.string(),
          href: z.string().optional(),
        }),
      }),
    ),
  }),
  officeList: z.object({
    title: contactSchemas.title,
    offices: z.array(
      z.object({
        title: contactSchemas.title,
        subtitle: contactSchemas.subtitle,
      }),
    ),
  }),
}

/**
 * Contact 3 configuration
 */
export const contact3Fields: GroupField = {
  name: 'contact-3',
  interfaceName: 'Contact3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Contact form',
  },
  fields: [
    createContactField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link',
              overrides: {
                admin: {
                  description: 'Link button',
                },
              },
            }),
          ],
          admin: {
            description: 'Links',
          },
          minRows: 1,
          maxRows: 2,
        },
      ],
      groups: [
        {
          name: 'supportList',
          label: 'Support List',
          fields: ['supports'],
          arrays: [
            {
              name: 'supports',
              fields: [
                cardsFields.icon,
                cardsFields.subtitle,
                cardsFields.title,
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Support card link',
                    },
                    defaultValue: {
                      label: 'Contact support',
                      appearances: 'link',
                    },
                  },
                }),
              ],
              minRows: 1,
              maxRows: 1,
              admin: {
                description: 'Support cards',
              },
            },
          ],
          admin: {
            description: 'Support list',
          },
        },
        {
          name: 'officeList',
          label: 'Offices list',
          fields: ['title'],
          arrays: [
            {
              name: 'offices',
              fields: [cardsFields.subtitle, cardsFields.title],
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Office cards',
              },
            },
          ],
          admin: {
            description: 'Office list',
          },
        },
      ],
    }),
  ],
}
