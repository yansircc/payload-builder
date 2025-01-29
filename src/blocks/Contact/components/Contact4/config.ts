import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { cardsFields, contactSchemas, createContactField } from '../shared/base-field'

/**
 * Contact 4 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  subtitle: contactSchemas.subtitle,
  description: contactSchemas.description,
  links: z.array(
    z.object({
      link: z.object({
        label: z.string(),
        href: z.string().optional(),
        appearances: z.string().optional(),
      }),
    }),
  ),
  supportList: z.object({
    supports: z.array(
      z.object({
        title: contactSchemas.title,
        subtitle: contactSchemas.subtitle,
        link: contactSchemas.link,
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
 * Contact 4 configuration
 */
export const contact4Fields: GroupField = {
  name: 'contact-4',
  interfaceName: 'Contact4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Contact form',
  },
  fields: [
    createContactField({
      includeFields: ['title', 'subtitle'],
      groups: [
        {
          name: 'supportList',
          label: 'Support List',
          fields: ['supports'],
          arrays: [
            {
              name: 'supports',
              fields: [
                cardsFields.title,
                cardsFields.subtitle,
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Support card link',
                    },
                    defaultValue: {
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
          name: 'locationList',
          label: 'Location list',
          fields: ['locations'],
          arrays: [
            {
              name: 'locations',
              fields: [
                cardsFields.image,
                cardsFields.subtitle,
                cardsFields.title,
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Support card link',
                    },
                    defaultValue: {
                      label: 'See on Google Maps',
                      appearances: 'link',
                    },
                  },
                }),
              ],
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Location carousel',
              },
            },
          ],
          admin: {
            description: 'Location list',
          },
        },
      ],
    }),
  ],
}
