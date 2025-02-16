import type { File, Payload } from 'payload'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { image3 } from './image-3'
import { imageHero1 } from './image-hero-1'

export async function seedMedia({
  payload,
  tenant,
  files,
}: {
  payload: Payload
  tenant: { id: string }
  files: {
    image1: File
    image2: File
    image3: File
    imageHero1: File
  }
}) {
  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: { ...image1, tenant: tenant.id },
      file: files.image1,
    }),
    payload.create({
      collection: 'media',
      data: { ...image2, tenant: tenant.id },
      file: files.image2,
    }),
    payload.create({
      collection: 'media',
      data: { ...image3, tenant: tenant.id },
      file: files.image3,
    }),
    payload.create({
      collection: 'media',
      data: { ...imageHero1, tenant: tenant.id },
      file: files.imageHero1,
    }),
  ])

  return {
    image1: image1Doc.id,
    image2: image2Doc.id,
    image3: image3Doc.id,
    imageHome: imageHomeDoc.id,
  }
}
