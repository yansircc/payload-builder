import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import type { Tenant } from '@/payload-types'

export async function getTenantFromDomain(): Promise<Tenant | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const headersList = headers()
    const host = (await headersList).get('host') || ''
    const domain = host.split(':')[0]

    const tenantQuery = await payload.find({
      collection: 'tenants',
      where: {
        domain: {
          equals: domain,
        },
      },
      limit: 1,
    })

    return (tenantQuery.docs[0] as Tenant) || null
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return null
  }
}
