import type { CollectionSlug, File, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = []

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
        context: {
          disableRevalidate: true,
        },
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

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

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

  const [
    demoAuthor,
    image1Doc,
    image2Doc,
    image3Doc,
    imageHomeDoc,
    technologyCategory,
    newsCategory,
    financeCategory,
    designCategory,
    softwareCategory,
    // engineeringCategory,
  ] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        username: 'demo',
        email: 'demo-author@example.com',
        password: 'password',
        roles: ['super-admin'],
      },
    }),

    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        breadcrumbs: [
          {
            label: 'Technology',
            url: '/technology',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'News',
        breadcrumbs: [
          {
            label: 'News',
            url: '/news',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
        breadcrumbs: [
          {
            label: 'Finance',
            url: '/finance',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
        breadcrumbs: [
          {
            label: 'Design',
            url: '/design',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
        breadcrumbs: [
          {
            label: 'Software',
            url: '/software',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Engineering',
        breadcrumbs: [
          {
            label: 'Engineering',
            url: '/engineering',
          },
        ],
      },
    }),
  ])

  let demoAuthorID: number | string = demoAuthor.id

  let image1ID: number | string = image1Doc.id
  let image2ID: number | string = image2Doc.id
  let image3ID: number | string = image3Doc.id
  let imageHomeID: number | string = imageHomeDoc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1Doc.id}"`
    image2ID = `"${image2Doc.id}"`
    image3ID = `"${image3Doc.id}"`
    imageHomeID = `"${imageHomeDoc.id}"`
    demoAuthorID = `"${demoAuthorID}"`
  }

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [technologyCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post2, categories: [newsCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image2ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image3ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: JSON.parse(
      JSON.stringify({ ...post3, categories: [financeCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image3ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image1ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding tenants and users...`)
  // Create super admin
  await payload.create({
    collection: 'users',
    data: {
      email: 'demo@payloadcms.com',
      password: 'demo',
      roles: ['super-admin'],
    },
  })

  // Create tenants
  const [tenant1, tenant2, tenant3] = await Promise.all([
    payload.create({
      collection: 'tenants',
      data: {
        name: 'Tenant 1',
        slug: 'gold',
        domain: 'gold.localhost.com',
      },
    }),
    payload.create({
      collection: 'tenants',
      data: {
        name: 'Tenant 2',
        slug: 'silver',
        domain: 'silver.localhost.com',
      },
    }),
    payload.create({
      collection: 'tenants',
      data: {
        name: 'Tenant 3',
        slug: 'bronze',
        domain: 'bronze.localhost.com',
      },
    }),
  ])

  // Create tenant users
  await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        email: 'tenant1@payloadcms.com',
        password: 'test',
        tenants: [{ roles: ['tenant-admin'], tenant: tenant1.id }],
        username: 'tenant1',
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'tenant2@payloadcms.com',
        password: 'test',
        tenants: [{ roles: ['tenant-admin'], tenant: tenant2.id }],
        username: 'tenant2',
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'tenant3@payloadcms.com',
        password: 'test',
        tenants: [{ roles: ['tenant-admin'], tenant: tenant3.id }],
        username: 'tenant3',
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'multi-admin@payloadcms.com',
        password: 'test',
        tenants: [
          { roles: ['tenant-admin'], tenant: tenant1.id },
          { roles: ['tenant-admin'], tenant: tenant2.id },
          { roles: ['tenant-admin'], tenant: tenant3.id },
        ],
        username: 'multi-admin',
      },
    }),
  ])

  // Create tenant pages
  await Promise.all([
    payload.create({
      collection: 'pages',
      data: {
        ...JSON.parse(
          JSON.stringify(home)
            .replace(/"\{\{IMAGE_1\}\}"/g, String(imageHomeID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID)),
        ),
        tenant: tenant1.id,
      },
    }),
    payload.create({
      collection: 'pages',
      data: {
        ...JSON.parse(
          JSON.stringify(home)
            .replace(/"\{\{IMAGE_1\}\}"/g, String(imageHomeID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID)),
        ),
        tenant: tenant2.id,
      },
    }),
    payload.create({
      collection: 'pages',
      data: {
        ...JSON.parse(
          JSON.stringify(home)
            .replace(/"\{\{IMAGE_1\}\}"/g, String(imageHomeID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID)),
        ),
        tenant: tenant3.id,
      },
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: JSON.parse(JSON.stringify(contactFormData)),
  })

  let contactFormID: number | string = contactForm.id

  if (payload.db.defaultIDType === 'text') {
    contactFormID = `"${contactFormID}"`
  }

  payload.logger.info(`— Seeding pages...`)

  const [_] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: {
        ...JSON.parse(
          JSON.stringify(contactPageData).replace(
            /"\{\{CONTACT_FORM_ID\}\}"/g,
            String(contactFormID),
          ),
        ),
        tenant: tenant1.id,
      },
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    // payload.updateGlobal({
    //   slug: 'header',
    //   data: {
    //     navItems: [
    //       {
    //         link: {
    //           type: 'custom',
    //           label: 'Posts',
    //           url: '/posts',
    //         },
    //       },
    //       {
    //         link: {
    //           type: 'reference',
    //           label: 'Contact',
    //           reference: {
    //             relationTo: 'pages',
    //             value: contactPage.id,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
    // payload.updateGlobal({
    //   slug: 'footer',
    //   data: footer,
    // }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

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
