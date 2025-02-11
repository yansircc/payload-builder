import payload from 'payload'
import React from 'react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getTenantFromDomain } from '@/utilities/getTenant'

export default async function NotFound() {
  const headersList = headers()
  const tenant = await getTenantFromDomain()

  // Log the 404 error
  try {
    const url =
      (await headersList).get('x-invoke-path') || (await headersList).get('x-url') || 'unknown'
    const userAgent = (await headersList).get('user-agent') || 'unknown'
    const referrer = (await headersList).get('referer') || undefined

    await payload.create({
      collection: 'error-logs',
      data: {
        url,
        errorType: '404',
        userAgent,
        referrer,
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
