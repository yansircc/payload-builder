import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import { aboutUs } from './about-us'
import { contact } from './contact-page'
import { home } from './home'

type CreatePageData = Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'>

interface SeedPagesArgs {
  payload: Payload
  tenant: {
    id: string
  }
  images: Record<string, string>
  formIds: {
    contact: string
  }
}

function replaceMediaPlaceholders(content: any, images: Record<string, string>): any {
  if (!content) return content

  try {
    const contentStr = JSON.stringify(content)
    const replaced = contentStr
      .replace(/"\{\{IMAGE_1\}\}"/g, `"${images.image1}"`)
      .replace(/"\{\{IMAGE_2\}\}"/g, `"${images.image2}"`)
      .replace(/"\{\{IMAGE_3\}\}"/g, `"${images.image3}"`)
    return JSON.parse(replaced)
  } catch (error) {
    return content
  }
}

export async function seedPages({
  payload,
  tenant,
  images,
  formIds,
}: SeedPagesArgs): Promise<void> {
  // Create pages
  await payload.create({
    collection: 'pages',
    data: {
      ...home,
      tenant: tenant.id,
      _status: 'published',
      meta: replaceMediaPlaceholders(home.meta, images),
      layout: replaceMediaPlaceholders(home.layout, images),
    } as CreatePageData,
  })

  await payload.create({
    collection: 'pages',
    data: {
      ...contact,
      tenant: tenant.id,
      _status: 'published',
      meta: replaceMediaPlaceholders(contact.meta, images),
      layout: (contact.layout || []).map((block) =>
        block.blockType === 'formBlock'
          ? { ...block, form: formIds.contact }
          : replaceMediaPlaceholders(block, images),
      ),
      hero: replaceMediaPlaceholders(contact.hero, images),
    } as CreatePageData,
  })

  await payload.create({
    collection: 'pages',
    data: {
      ...aboutUs,
      tenant: tenant.id,
      _status: 'published',
      meta: replaceMediaPlaceholders(aboutUs.meta, images),
      layout: replaceMediaPlaceholders(aboutUs.layout, images),
      hero: replaceMediaPlaceholders(aboutUs.hero, images),
    } as CreatePageData,
  })
}
