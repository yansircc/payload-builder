import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getTenantFromDomain } from '@/utilities/getTenant'

export default async function NotFound() {
  const tenant = await getTenantFromDomain()
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

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
