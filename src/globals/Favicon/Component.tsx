import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Media } from '@/payload-types'
import { getTenantFromDomain } from '@/utilities/getTenant'

async function getFaviconSettings() {
  const tenant = await getTenantFromDomain()
  const payload = await getPayload({ config: configPromise })

  if (!tenant) return null

  const siteSettings = await payload.find({
    collection: 'site-settings',
    where: { tenant: { equals: tenant.id } },
    limit: 1,
    depth: 1,
  })

  return siteSettings.docs[0]?.favicon as Media | undefined
}

export async function Favicon() {
  const favicon = await getFaviconSettings()

  if (!favicon || typeof favicon === 'string') {
    // Return default favicon links if no custom favicon is set
    return (
      <>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </>
    )
  }

  const faviconUrl = favicon.url || ''
  const mimeType = favicon.mimeType || 'image/x-icon'

  // Return custom favicon based on the uploaded media
  return (
    <>
      {mimeType === 'image/svg+xml' ? (
        <link href={faviconUrl} rel="icon" type="image/svg+xml" />
      ) : mimeType === 'image/x-icon' ? (
        <link href={faviconUrl} rel="icon" sizes="32x32" />
      ) : (
        // For other image types (png, jpeg, etc.), create both standard and SVG favicon links
        <>
          <link href={faviconUrl} rel="icon" type={mimeType} sizes="32x32" />
        </>
      )}
    </>
  )
}
