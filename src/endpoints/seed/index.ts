import type { CollectionSlug, File, GlobalSlug, Payload, PayloadRequest } from 'payload'
import type { Form } from '@/payload-types'
import { seedCategories } from './collections/categories'
import { contactForm } from './collections/forms/contact-form'
import { seedMedia } from './collections/media'
import { seedPages } from './collections/pages'
import { seedPopups } from './collections/popups'
import { seedPosts } from './collections/posts'
import { seedProducts } from './collections/products'
import { seedServices } from './collections/services'
import { seedSiteSettings } from './collections/site-settings'
import { seedTenants } from './collections/tenants'
import { seedUsers } from './collections/users'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'products',
  'services',
  'popups',
] as const

const globals: GlobalSlug[] = []

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, { credentials: 'include', method: 'GET' })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Fetching media files...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  payload.logger.info(`— Seeding tenants...`)
  const tenants = await seedTenants({ payload })

  payload.logger.info(`— Seeding users...`)
  const users = await seedUsers({ payload, tenants })

  payload.logger.info(`— Seeding media...`)
  const mediaIds = await seedMedia({
    payload,
    tenant: tenants.tenant1,
    files: {
      image1: image1Buffer,
      image2: image2Buffer,
      image3: image3Buffer,
      imageHero1: hero1Buffer,
    },
  })

  payload.logger.info(`— Seeding categories...`)
  const categories = await seedCategories({ payload, tenant: tenants.tenant1 })

  payload.logger.info(`— Creating contact form...`)
  const form = await payload.create({
    collection: 'forms',
    data: {
      ...contactForm,
      tenant: tenants.tenant1.id,
      _status: 'published',
      title: contactForm.title || 'Contact Form',
    } as Omit<Form, 'id' | 'updatedAt' | 'createdAt' | 'sizes'>,
  })

  payload.logger.info(`— Seeding pages...`)
  await seedPages({
    payload,
    images: mediaIds,
    tenant: tenants.tenant1,
    formIds: {
      contact: form.id,
    },
  })

  payload.logger.info(`— Seeding posts...`)
  await seedPosts({
    payload,
    images: mediaIds,
    demoAuthor: users.demoAuthor,
    categories,
    tenant: tenants.tenant1,
  })

  payload.logger.info(`— Seeding products...`)
  await seedProducts({
    payload,
    images: mediaIds,
    demoAuthor: users.demoAuthor,
    categories,
    tenant: tenants.tenant1,
  })

  payload.logger.info(`— Seeding services...`)
  await seedServices({
    payload,
    images: mediaIds,
    demoAuthor: users.demoAuthor,
    categories,
    tenant: tenants.tenant1,
  })

  payload.logger.info(`— Seeding popups...`)
  await seedPopups({
    payload,
    tenant: tenants.tenant1,
  })

  payload.logger.info(`— Seeding site settings...`)
  await seedSiteSettings({ payload, tenants })

  payload.logger.info('Seeded database successfully!')
}
