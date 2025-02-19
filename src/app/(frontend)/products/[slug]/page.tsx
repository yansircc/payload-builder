import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PostHero } from '@/heros/components/PostHero'
// import { ProductHero } from '@/heros/components/ProductHero'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getTenantFromDomain } from '@/utilities/getTenant'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/products/' + slug
  const tenant = await getTenantFromDomain()

  let product: Product | null = null

  if (tenant) {
    // Then query the product with both slug and tenant
    product = await queryProductBySlugAndTenant({ slug, tenantId: tenant.id })
  }

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero item={product} />

      <div className="flex flex-col items-center gap-8 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={product.content} enableGutter={false} />
        </div>

        {/* Specifications Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="max-w-[48rem] w-full">
            <h2 className="mb-6 text-2xl font-semibold">Specifications</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.specifications.map((spec, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{spec.name}</TableCell>
                      <TableCell>{spec.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* Additional Images Gallery */}
        {product.productImages && product.productImages.length > 0 && (
          <div className="max-w-[48rem] w-full">
            <h2 className="mb-6 text-2xl font-semibold">Product Gallery</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.productImages.map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    {image && typeof image !== 'string' && (
                      <Media
                        resource={image}
                        size="100vw"
                        className="aspect-video w-full object-cover"
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="max-w-[48rem] w-full">
            <h2 className="mb-6 text-2xl font-semibold">Related Products</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.relatedProducts.map((relatedProduct, index) => {
                if (typeof relatedProduct === 'string') return null
                return (
                  <Link href={`/products/${relatedProduct.slug}`} key={index}>
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        {relatedProduct.heroImage &&
                          typeof relatedProduct.heroImage !== 'string' && (
                            <Media
                              resource={relatedProduct.heroImage}
                              size="100vw"
                              className="aspect-video w-full object-cover"
                            />
                          )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{relatedProduct.title}</h3>
                          {relatedProduct.content && (
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              <RichText data={relatedProduct.content} />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const tenant = await getTenantFromDomain()

  const product = tenant
    ? await queryProductBySlugAndTenant({
        slug,
        tenantId: tenant.id,
      })
    : null

  return generateMeta({ doc: product })
}

const queryProductBySlugAndTenant = cache(
  async ({ slug, tenantId }: { slug: string; tenantId: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'products',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            tenant: {
              equals: tenantId,
            },
          },
        ],
      },
    })

    return result.docs?.[0] || null
  },
)
