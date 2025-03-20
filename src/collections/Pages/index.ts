import { createParentField } from '@payloadcms/plugin-nested-docs'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { CollectionConfig } from 'payload'
import { ColumnsBlock } from '@/blocks/ColumnBlock/config'
import { CtaSimpleBlock } from '@/blocks/CtaSimpleBlock/config'
import { HTML } from '@/blocks/HTML/config'
import { LinkPopupBlock } from '@/blocks/LinkPopupBlock/config'
import { ListBlock } from '@/blocks/List/config'
import { Table } from '@/blocks/Table/config'
import { VideoBlock } from '@/blocks/VideoBlock/config'
import { superAdminOrTenantAdminAccess } from '@/collections/Pages/access/superAdminOrTenantAdmin'
import { slugField } from '@/fields/slug'
import { structuredDataField } from '@/fields/structuredData'
import { HeroField } from '@/heros/config'
import { updatePreviewImage } from '@/hooks/beforeChange'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { AboutBlock } from '../../blocks/About/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Contact } from '../../blocks/Contact/config'
import { Content } from '../../blocks/Content/config'
import { FAQ } from '../../blocks/FAQ/config'
import { Feature } from '../../blocks/Feature/config'
import { FormBlock } from '../../blocks/Form/config'
import { GalleryBlock } from '../../blocks/Gallery/config'
import { LogosBlock } from '../../blocks/Logos/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Team } from '../../blocks/Team/config'
import { TestimonialBlock } from '../../blocks/Testimonial/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { deleteChildPages } from './hooks/deleteChildPages'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { updateChildPaths } from './hooks/updateChildPaths'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    fullPath: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'fullPath', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.fullPath === 'string' ? data.fullPath : '',
          tenant: typeof data?.tenant === 'string' ? data.tenant : '',
          collection: 'pages',
          req,
        })
        return path
      },
    },
    preview: (data: any, { req }) =>
      generatePreviewPath({
        slug: typeof data?.fullPath === 'string' ? data.fullPath : '',
        tenant: typeof data?.tenant.id === 'string' ? data.tenant.id : '',
        collection: 'pages',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        components: {
          Cell: {
            path: '@/collections/Pages/components/cells/TitleCell#TitleCell',
          },
        },
      },
    },
    createParentField('pages', {
      admin: {
        position: 'sidebar',
        disableListColumn: true,
        disableListFilter: true,
      },
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
        _status: {
          equals: 'published',
        },
      }),
    }),
    {
      type: 'tabs',
      tabs: [
        {
          fields: [HeroField],
          label: 'Hero',
          admin: {
            disableListColumn: true,
            disableListFilter: true,
          },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                AboutBlock,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                GalleryBlock,
                Feature,
                Table,
                HTML,
                ColumnsBlock,
                TestimonialBlock,
                Contact,
                Team,
                FAQ,
                LogosBlock,
                LinkPopupBlock,
                ListBlock,
                VideoBlock,
                CtaSimpleBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
                disableListColumn: true,
                disableListFilter: true,
              },
            },
          ],
          label: 'Content',
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
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
          admin: {
            disableListColumn: true,
            disableListFilter: true,
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField('pages'),
    {
      name: 'previewImage',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/StaticPreview',
        },
      },
    },
    structuredDataField,
  ],
  hooks: {
    afterChange: [revalidatePage, updateChildPaths],
    beforeChange: [populatePublishedAt, updatePreviewImage],
    afterDelete: [deleteChildPages, revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
