'use client'

import { ExternalLink } from 'lucide-react'
import type { DefaultCellComponentProps } from 'payload'
import { useEffect, useState } from 'react'
import type { Tenant } from '@/payload-types'
import { getTenantByIdFromClient } from '@/utilities/getTenant.client'

// Cache for tenant data to prevent redundant fetches
const tenantCache: Record<string, any> = {}

function getFullUrl(domain: string, path: string): string {
  // Use window.location to determine if we're in development mode
  // Development typically runs on localhost or has a non-standard port
  const isDevelopment =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.port === '3000')

  const protocol = isDevelopment ? 'http' : 'https'
  const port = isDevelopment ? ':3000' : ''
  return `${protocol}://${domain}${port}/${path}`
}

export function FullPathCell(props: DefaultCellComponentProps) {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(false)
  const tenantId = props.rowData.tenant

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        // If we have cached data, use it
        if (tenantCache[tenantId]) {
          setTenant(tenantCache[tenantId])
          return
        }

        setLoading(true)
        const tenantData = await getTenantByIdFromClient(tenantId)

        // Cache the result
        if (tenantData) {
          tenantCache[tenantId] = tenantData
          setTenant(tenantData)
        }
      } catch (error) {
        console.error('Error fetching tenant:', error)
      } finally {
        setLoading(false)
      }
    }

    if (tenantId && !tenantCache[tenantId]) {
      fetchTenant()
    } else if (tenantId && tenantCache[tenantId]) {
      setTenant(tenantCache[tenantId])
    }
  }, [tenantId])

  if (loading) {
    return <span>Loading...</span>
  }

  if (!tenant?.domain) {
    return <span>{props.cellData}</span>
  }

  return (
    <a
      href={getFullUrl(tenant.domain, props.cellData)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 hover:underline"
    >
      {props.cellData} <ExternalLink size={12} />
    </a>
  )
}
