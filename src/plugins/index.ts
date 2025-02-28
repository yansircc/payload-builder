import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Plugin } from 'payload'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { processBlockField } from '@/hooks/form/formFieldValidation'
import normalizeRedirectUrls from '@/hooks/normalizeRedirectUrls'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { Config, Page, Post } from '@/payload-types'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchFields } from '@/search/fieldOverrides'
import { getServerSideURL } from '@/utilities/getURL'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      admin: {
        group: 'Configuration',
        description: 'Manage the redirects for your site',
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description:
                  'Please enter the path only, such as `/abc`, instead of the full domain name like `example.com/abc`.',
              },
              hooks: { beforeValidate: [normalizeRedirectUrls] },
            }
          }
          return field
        })
      },
      hooks: { afterChange: [revalidateRedirects] },
    },
    redirectTypes: ['301', '302'],
    redirectTypeFieldOverride: { label: 'Redirect Type (Overridden)' },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({ generateTitle, generateURL }),
  formBuilderPlugin({
    fields: { payment: false },
    formOverrides: {
      admin: {
        group: 'Template',
        description: 'Manage the form for your site',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          // Handle blocks field type
          if ('type' in field && field.type === 'blocks' && 'blocks' in field) {
            return {
              ...field,
              blocks: field.blocks.map((block) => {
                if ('fields' in block) {
                  return {
                    ...block,
                    fields: block.fields.map(processBlockField),
                  }
                }
                return block
              }),
            }
          }

          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Notifications',
        description: 'Manage the form submissions for your site',
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      admin: {
        group: 'System',
        description: 'Manage the search for your site',
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  multiTenantPlugin<Config>({
    collections: {
      pages: {},
      posts: {},
      products: {},
      services: {},
      categories: {},
      forms: {},
      redirects: {},
      'form-submissions': {},
      search: {},
      header: { isGlobal: true },
      footer: { isGlobal: true },
      'custom-codes': { isGlobal: true },
      popups: {},
      'site-settings': { isGlobal: true },
      widgets: { isGlobal: true },
      'error-logs': {},
      media: { useTenantAccess: false },
      'ai-agents': {},
    },
    tenantField: {
      access: {
        read: () => true,
        update: ({ req }) => {
          if (isSuperAdmin(req.user)) {
            return true
          }
          return getUserTenantIDs(req.user).length > 0
        },
      },
    },
    tenantsArrayField: { includeDefaultField: false },
    userHasAccessToAllTenants: (user) => isSuperAdmin(user),
  }),
  vercelBlobStorage({
    enabled: process.env.NODE_ENV !== 'development',
    // Specify which collections should use Vercel Blob
    collections: { media: { disableLocalStorage: process.env.NODE_ENV !== 'development' } },
    // Token provided by Vercel once Blob storage is added to your Vercel project
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
]
