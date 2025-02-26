import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { headers } from 'next/headers'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { DefaultNotFoundPage } from '@/components/NotFound'
import { getTenantFromDomain } from '@/utilities/getTenant'

interface SiteSettingsDoc {
  custom404Page?: string
  notFoundSettings?: {
    custom404Page?: string
  }
}

export default async function NotFound() {
  const tenant = await getTenantFromDomain()

  if (!tenant) {
    // If no tenant found, render default 404
    return <DefaultNotFoundPage />
  }

  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()

  // Log the 404 error
  try {
    // Get the current URL that caused the 404
    const host = headersList.get('host')
    const referer = headersList.get('referer')
    const path = headersList.get('x-invoke-path')
    const fallbackUrl = headersList.get('x-url')
    const userAgent = headersList.get('user-agent')

    // Extract the path from referer if possible, otherwise use other sources
    let currentUrl = 'unknown'
    if (referer && host) {
      const refererUrl = new URL(referer)
      currentUrl = refererUrl.pathname
    } else if (path) {
      currentUrl = path
    } else if (fallbackUrl) {
      currentUrl = fallbackUrl
    }

    await payload.create({
      collection: 'error-logs',
      data: {
        url: currentUrl,
        errorType: '404',
        userAgent: userAgent || 'unknown',
        referrer: referer || undefined,
        tenant: tenant?.id || null,
      } as const,
    })
  } catch (error) {
    // Silent fail - we don't want to break the 404 page if logging fails
    console.error('Failed to log 404 error:', error)
  }

  // Get tenant's site settings
  const siteSettings = await payload.find({
    collection: 'site-settings',
    where: { tenant: { equals: tenant.id } },
    depth: 0,
  })

  const siteSettingsDoc = (siteSettings?.docs[0] || {}) as SiteSettingsDoc

  // Get 404 settings
  const notFoundSettings = siteSettingsDoc.notFoundSettings || {}
  const custom404PageId = notFoundSettings.custom404Page || siteSettingsDoc.custom404Page

  if (custom404PageId) {
    // Fetch the custom 404 page with all blocks
    const customPage = await payload.findByID({
      collection: 'pages',
      id: custom404PageId as string,
      depth: 10, // Get all blocks and nested content
    })

    if (customPage) {
      // Render the custom 404 page with its layout
      return (
        <>
          <main>
            {customPage.layout && Array.isArray(customPage.layout) && (
              <RenderBlocks blocks={customPage.layout} />
            )}
          </main>
        </>
      )
    }
  }

  return <DefaultNotFoundPage />
}
