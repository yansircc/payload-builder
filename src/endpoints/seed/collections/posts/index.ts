import type { Payload } from 'payload'
import type { Post } from '@/payload-types'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

interface Categories {
  technology: { id: string }
  news: { id: string }
  finance: { id: string }
}

interface Images {
  image1: string
  image2: string
  image3: string
}

type CreatePostData = Omit<Post, 'id' | 'updatedAt' | 'createdAt' | 'sizes'>

function replaceMediaPlaceholders(content: any, images: Images): any {
  const contentStr = JSON.stringify(content)
  const replaced = contentStr
    .replace(/"\{\{IMAGE_1\}\}"/g, `"${images.image1}"`)
    .replace(/"\{\{IMAGE_2\}\}"/g, `"${images.image2}"`)
    .replace(/"\{\{IMAGE_3\}\}"/g, `"${images.image3}"`)
  return JSON.parse(replaced)
}

export async function seedPosts({
  payload,
  images,
  demoAuthor,
  categories,
  tenant,
}: {
  payload: Payload
  images: Images
  demoAuthor: { id: string }
  categories: Categories
  tenant: { id: string }
}) {
  // Create posts
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      ...post1,
      title: post1.title || 'Untitled Post',
      categories: [categories.technology.id],
      tenant: tenant.id,
      authors: [demoAuthor.id],
      heroImage: images.image1,
      meta: {
        ...post1.meta,
        image: images.image1,
      },
      content: replaceMediaPlaceholders(
        JSON.parse(JSON.stringify(post1.content).replace(/"\{\{AUTHOR\}\}"/g, demoAuthor.id)),
        images,
      ),
    } as CreatePostData,
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      ...post2,
      title: post2.title || 'Untitled Post',
      categories: [categories.news.id],
      tenant: tenant.id,
      authors: [demoAuthor.id],
      heroImage: images.image2,
      meta: {
        ...post2.meta,
        image: images.image2,
      },
      content: replaceMediaPlaceholders(
        JSON.parse(JSON.stringify(post2.content).replace(/"\{\{AUTHOR\}\}"/g, demoAuthor.id)),
        images,
      ),
    } as CreatePostData,
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      ...post3,
      title: post3.title || 'Untitled Post',
      categories: [categories.finance.id],
      tenant: tenant.id,
      authors: [demoAuthor.id],
      heroImage: images.image3,
      meta: {
        ...post3.meta,
        image: images.image3,
      },
      content: replaceMediaPlaceholders(
        JSON.parse(JSON.stringify(post3.content).replace(/"\{\{AUTHOR\}\}"/g, demoAuthor.id)),
        images,
      ),
    } as CreatePostData,
  })

  // Update related posts
  await Promise.all([
    payload.update({
      id: post1Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post2Doc.id, post3Doc.id],
        tenant: tenant.id,
      },
    }),
    payload.update({
      id: post2Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id, post3Doc.id],
        tenant: tenant.id,
      },
    }),
    payload.update({
      id: post3Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id, post2Doc.id],
        tenant: tenant.id,
      },
    }),
  ])

  return { post1Doc, post2Doc, post3Doc }
}
