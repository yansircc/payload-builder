import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from '@/collections/Pages/access/superAdminOrTenantAdmin'
import { color } from '@/fields/color'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'

export const Popups: CollectionConfig = {
  slug: 'popups',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    description: 'Create and manage popups that can be triggered from any link field.',
    group: 'Content',
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', label: 'Name of popup', required: true },
    {
      type: 'tabs', // required
      tabs: [
        {
          name: 'basicSettings',
          label: 'Basic Settings',
          admin: { description: 'Configure title and content of the popup' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Name your popup for easy reference' },
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
              admin: { description: 'Add content to your popup' },
            },
          ],
        },
        {
          name: 'triggerSettings',
          label: 'Trigger Settings',
          admin: { description: 'Configure when and how the popup appears' },
          fields: [
            {
              name: 'triggerType',
              type: 'select',
              required: true,
              defaultValue: 'manual',
              options: [
                { label: 'Manual (Button/Link Click)', value: 'manual' },
                { label: 'Page Load', value: 'pageLoad' },
                { label: 'Scroll Depth', value: 'scrollDepth' },
                { label: 'Exit Intent', value: 'exitIntent' },
              ],
            },
            {
              name: 'delay',
              type: 'number',
              admin: {
                description: 'Delay in seconds before showing the popup',
                condition: (_, { triggerType }) => triggerType === 'pageLoad',
              },
              min: 0,
              defaultValue: 0,
            },
            {
              name: 'scrollDepthPercentage',
              type: 'number',
              admin: {
                description: 'Percentage of page scroll before showing popup (0-100)',
                condition: (_, { triggerType }) => triggerType === 'scrollDepth',
              },
              min: 0,
              max: 100,
              defaultValue: 50,
            },
            {
              name: 'frequency',
              type: 'select',
              defaultValue: 'always',
              options: [
                { label: 'Always', value: 'always' },
                { label: 'Once per session', value: 'session' },
                { label: 'Once per day', value: 'daily' },
                { label: 'Once per week', value: 'weekly' },
                { label: 'Once only', value: 'once' },
              ],
              admin: {
                description: 'How often should this popup be shown to the same user?',
                condition: (_, { triggerType }) => triggerType !== 'manual',
              },
            },
          ],
        },
        {
          name: 'appearanceSettings',
          label: 'Appearance Settings',
          fields: [
            color({
              label: 'Background Color',
              name: 'backgroundColor',
              defaultValue: '#FFFFFF',
              admin: { description: 'Choose the background color' },
            }),
            color({
              label: 'Text Color',
              name: 'textColor',
              defaultValue: '#000000',
              admin: { description: 'Choose the text color ' },
            }),
            {
              name: 'size',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Default', value: 'default' },
                { label: 'Large', value: 'lg' },
                { label: 'Full Screen', value: 'full' },
              ],
              admin: { description: 'Choose the size of the popup' },
            },
            {
              name: 'animation',
              type: 'select',
              defaultValue: 'fade',
              options: [
                { label: 'Fade', value: 'fade' },
                { label: 'Slide Up', value: 'slideUp' },
                { label: 'Slide Down', value: 'slideDown' },
                { label: 'Scale', value: 'scale' },
              ],
            },
            {
              name: 'position',
              type: 'select',
              defaultValue: 'center',
              options: [
                { label: 'Center', value: 'center' },
                { label: 'Top', value: 'top' },
                { label: 'Bottom', value: 'bottom' },
              ],
            },
            {
              name: 'backdrop',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Blur', value: 'blur' },
                { label: 'None', value: 'none' },
              ],
            },
          ],
        },
      ],
    },

    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
  hooks: { beforeChange: [populatePublishedAt] },
  versions: { drafts: { autosave: true } },
}
