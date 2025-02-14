import { CollectionSlug, PayloadRequest } from 'payload'
import { headers } from 'next/headers'
import { env } from '@/env'
import { getTenantById } from './getTenant'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  products: '/products',
  services: '/services',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  tenant: string
  req: PayloadRequest
}

export const generatePreviewPath = async ({ collection, slug, tenant, req }: Props) => {
  const currentTenant = await getTenantById(tenant)
  if (!currentTenant) {
    throw new Error('Tenant not found')
  }

  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const [, port] = host.split(':')

  const path = `${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
    tenant,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction =
    env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol
  const portString = !isProduction && port ? `:${port}` : ''

  const url = `${protocol}//${currentTenant.domain}${portString}/next/preview?${encodedParams.toString()}`

  return url
}
