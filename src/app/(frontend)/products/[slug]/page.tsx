import configPromise from '@payload-config'
import { ChevronRight } from 'lucide-react'
import { getPayload } from 'payload'
import { Thing, WithContext } from 'schema-dts'
import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import SchemaOrganizer from '@/components/SchemaOrganizer'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getSiteSettingsFromDomain } from '@/utilities/getSiteSettings'
import { getTenantFromDomain } from '@/utilities/getTenant'
import { generateProductSchema } from '@/utilities/schema'
import { ImageGallery } from './ImageGallery'
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
    product = await queryProductBySlugAndTenant({ slug, tenantId: tenant.id })
  }

  if (!product) return <PayloadRedirects url={url} />

  // Generate schema for the product
  const siteSettings = await getSiteSettingsFromDomain()

  // Get the appropriate domain for schema URLs
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const domain = host.split(':')[0]
  const port = host.includes(':') ? ':' + host.split(':')[1] : ''

  // Use the tenant domain for the baseUrl
  const protocol = host.includes('localhost') ? 'http://' : 'https://'
  const baseUrl = `${protocol}${domain}${port}`

  // Create product schema
  const productSchema = generateProductSchema(product, { siteSettings, baseUrl })

  // Prepare schemas array with product schema
  const schemas: WithContext<Thing>[] = [productSchema]

  // Check if disableGlobalSchema is true
  const disableGlobalSchema = product.structuredData?.disableGlobalSchema === true

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <SchemaOrganizer
        items={schemas}
        baseUrl={baseUrl}
        tenantId={tenant?.id}
        domain={domain}
        siteSettings={siteSettings}
        disableGlobalSchema={disableGlobalSchema}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        {product.categories?.[0] && typeof product.categories?.[0] !== 'string' && (
          <>
            {product.categories?.[0]?.breadcrumbs?.map((crumb) => (
              <React.Fragment key={crumb.url}>
                <Link href={crumb.url || '#'} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </React.Fragment>
            ))}
          </>
        )}
        <span className="text-foreground">{product.title}</span>
      </nav>

      {/* Main Product Overview */}
      <Card className="overflow-hidden bg-background">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column: Product Gallery */}
          <div className="p-8">
            <ImageGallery heroImage={product.heroImage} productImages={product.productImages} />
          </div>

          {/* Right column: Product Details */}
          <div className="space-y-6 p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-3xl font-bold">{product.title}</CardTitle>
              <CardDescription>
                {product.description && <RichText data={product.description} className="p-0" />}
              </CardDescription>
            </CardHeader>
            <CardFooter className="px-0 pb-0 flex flex-row gap-2">
              {product?.links?.map((linkGroup, index) => (
                <div key={index} className="flex flex-row gap-2">
                  {Object.entries(linkGroup).map(
                    ([key, link]) =>
                      link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                  )}
                </div>
              ))}
            </CardFooter>
          </div>
        </div>
        {/* Product Details Tabs */}
        <div className="container mb-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background"
              >
                Description
              </TabsTrigger>
              {product.specifications && (
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background"
                >
                  Specifications
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose dark:prose-invert max-w-4xl">
                {product.content && <RichText data={product.content} className="p-0" />}
              </div>
            </TabsContent>
            {product.specifications && (
              <TabsContent value="specifications" className="pt-6">
                <div className="prose dark:prose-invert max-w-4xl">
                  <RichText data={product.specifications} className="p-0" />
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </Card>

      {/* Related Products Section */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.relatedProducts.map((relatedProduct, index) => {
                if (typeof relatedProduct === 'string') return null
                return (
                  <Link href={`/products/${relatedProduct.slug}`} key={index} className="space-y-2">
                    <div className="aspect-square relative">
                      {relatedProduct.heroImage && typeof relatedProduct.heroImage !== 'string' && (
                        <Media
                          resource={relatedProduct.heroImage}
                          size="100vw"
                          imgClassName="rounded-lg aspect-square object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm">{relatedProduct.title}</h3>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
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

  const meta = generateMeta({ doc: product })

  // Add robots meta tag if noindex is true
  if (product?.meta?.noindex) {
    return {
      ...meta,
      robots: {
        index: false,
        follow: true,
      },
    }
  }

  return meta
}

const queryProductBySlugAndTenant = cache(
  async ({ slug, tenantId }: { slug: string; tenantId: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
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
