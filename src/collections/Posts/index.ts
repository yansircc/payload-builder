import configPromise from '@payload-config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { getPayload, PaginatedDocs } from 'payload'
import { ColumnsBlock } from '@/blocks/ColumnBlock/config'
import { CtaSimpleBlock } from '@/blocks/CtaSimpleBlock/config'
import { HTML } from '@/blocks/HTML/config'
import { LinkPopupBlock } from '@/blocks/LinkPopupBlock/config'
import { ListBlock } from '@/blocks/List/config'
import { Table } from '@/blocks/Table/config'
import { VideoBlock } from '@/blocks/VideoBlock/config'
import { slugField } from '@/fields/slug'
import { Post } from '@/payload-types'
import { getTenantFromDomain } from '@/utilities/getTenant'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          tenant: typeof data?.tenant === 'string' ? data.tenant : '',
          collection: 'posts',
          req,
        })

        return path
      },
    },
    preview: (data: any, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        tenant: typeof data?.tenant.id === 'string' ? data.tenant.id : '',
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                    }),
                    BlocksFeature({
                      blocks: [
                        Banner,
                        Code,
                        MediaBlock,
                        Table,
                        HTML,
                        VideoBlock,
                        ListBlock,
                        ColumnsBlock,
                        LinkPopupBlock,
                        CtaSimpleBlock,
                      ],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
              filterOptions: () => {
                return {
                  type: {
                    equals: 'post',
                  },
                }
              },
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            {
              name: 'noindex',
              label: 'If checked, the page will not be indexed by search engines',
              type: 'checkbox',
              defaultValue: false,
            },
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField('posts'),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  endpoints: [
    {
      path: '/',
      method: 'get',
      handler: async () => {
        const tenant = await getTenantFromDomain()
        const payload = await getPayload({ config: configPromise })

        if (!tenant) {
          return Response.json({
            message: `No tenant found`,
          })
        }

        let posts: PaginatedDocs<Post> | null = null

        if (tenant) {
          // Then query the page with both fullPath and tenant
          posts = await payload.find({
            collection: 'posts',
            depth: 1,
            limit: 12,
            overrideAccess: false,
            select: {
              title: true,
              slug: true,
              categories: true,
              meta: true,
              content: true,
              updatedAt: true,
              createdAt: true,
            },
            where: {
              tenant: {
                equals: tenant.id,
              },
            },
          })
        }

        return Response.json(posts)
      },
    },
    {
      path: '/:slug',
      method: 'get',
      handler: async (req) => {
        const tenant = await getTenantFromDomain()
        const payload = await getPayload({ config: configPromise })

        if (!tenant) {
          return Response.json({
            message: `No tenant found`,
          })
        }

        const result = await payload.find({
          collection: 'posts',
          limit: 1,
          pagination: false,
          where: {
            and: [
              {
                slug: {
                  equals: req.routeParams?.slug,
                },
              },
              {
                tenant: {
                  equals: tenant?.id,
                },
              },
            ],
          },
        })

        return Response.json(result.docs?.[0] || null)
      },
    },
  ],
}
