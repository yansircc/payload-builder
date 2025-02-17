import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

const archiveStyleOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
  { label: 'Card', value: 'card' },
]

const brandIdentityOptions = [
  { label: 'Luxury', value: 'luxury' },
  { label: 'Professional', value: 'professional' },
  { label: 'Casual', value: 'casual' },
  { label: 'Tech-oriented', value: 'tech-oriented' },
  { label: 'Creative', value: 'creative' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Modern', value: 'modern' },
]

const industryFocusOptions = [
  { label: 'SaaS', value: 'saas' },
  { label: 'Finance', value: 'finance' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Technology', value: 'technology' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Other', value: 'other' },
]

const targetAudienceOptions = [
  { label: 'Startups', value: 'startups' },
  { label: 'Corporate Clients', value: 'corporate' },
  { label: 'General Consumers', value: 'consumers' },
  { label: 'Small Businesses', value: 'small-business' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'Developers', value: 'developers' },
]

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings', useAsTitle: 'title' },
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  versions: { drafts: true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              maxLength: 60,
              admin: { description: 'SEO title for homepage (recommended: 50-60 characters)' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              maxLength: 160,
              admin: {
                description: 'SEO description for homepage (recommended: 150-160 characters)',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: { description: 'Upload your site favicon (recommended size: 32x32 or 16x16)' },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: { description: 'Upload your site logo' },
            },
            {
              name: 'searchEngineVisibility',
              type: 'group',
              fields: [
                {
                  name: 'allowIndexing',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Allow search engines to index this site',
                },
                {
                  name: 'robotsTxtContent',
                  type: 'textarea',
                  admin: {
                    description: 'Custom robots.txt content (optional)',
                    condition: (data, siblingData) => !siblingData.allowIndexing,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Theme',
          fields: [
            {
              name: 'archiveStyles',
              type: 'group',
              label: 'Archive Page Styles',
              fields: [
                {
                  name: 'posts',
                  type: 'select',
                  label: 'Posts Archive Style',
                  defaultValue: 'grid',
                  options: archiveStyleOptions,
                  admin: {
                    description: 'Select the layout style for the posts archive page',
                  },
                },
                {
                  name: 'services',
                  type: 'select',
                  label: 'Services Archive Style',
                  defaultValue: 'grid',
                  options: archiveStyleOptions,
                  admin: {
                    description: 'Select the layout style for the services archive page',
                  },
                },
                {
                  name: 'products',
                  type: 'select',
                  label: 'Products Archive Style',
                  defaultValue: 'grid',
                  options: archiveStyleOptions,
                  admin: {
                    description: 'Select the layout style for the products archive page',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Company Information',
          fields: [
            {
              name: 'brandIdentity',
              type: 'select',
              label: 'Brand Identity',
              options: brandIdentityOptions,
              required: true,
              admin: {
                description:
                  'Select the primary brand identity that best represents your website or company',
              },
            },
            {
              name: 'otherBrandIdentity',
              type: 'text',
              admin: {
                description: 'If your brand identity is not listed above, please specify',
              },
            },
            {
              name: 'industryFocus',
              type: 'select',
              label: 'Industry Focus',
              options: industryFocusOptions,
              required: true,
              admin: {
                description: 'Select the primary industry your business operates in',
              },
            },
            {
              name: 'otherIndustryFocus',
              type: 'text',
              admin: {
                description: 'If your industry is not listed above, please specify',
                condition: (data, siblingData) => siblingData?.industryFocus === 'other',
              },
            },
            {
              name: 'targetAudience',
              type: 'select',
              label: 'Primary Target Audience',
              options: targetAudienceOptions,
              required: true,
              admin: {
                description: 'Select your primary target audience',
              },
            },
            {
              name: 'secondaryAudiences',
              type: 'select',
              label: 'Secondary Target Audiences',
              options: targetAudienceOptions,
              hasMany: true,
              admin: {
                description: 'Select any secondary target audiences (optional)',
              },
            },
            {
              name: 'audienceNotes',
              type: 'textarea',
              label: 'Additional Audience Notes',
              admin: {
                description: 'Any additional notes about your target audience (optional)',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings
