import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { headers } from 'next/headers'
import Script from 'next/script'
import { SCRIPT_TYPES } from '@/collections/CustomCodes'
import type { CustomCode as CustomCodeType } from '@/payload-types'

interface ScriptProps {
  script: NonNullable<NonNullable<CustomCodeType['scripts']>[number]>
}

function ScriptRenderer({ script }: ScriptProps) {
  switch (script.type) {
    case SCRIPT_TYPES.GOOGLE_ANALYTICS:
      return script.trackingId ? <GoogleAnalytics gaId={script.trackingId} /> : null

    case SCRIPT_TYPES.GOOGLE_TAG_MANAGER:
      return script.trackingId ? <GoogleTagManager gtmId={script.trackingId} /> : null

    case SCRIPT_TYPES.CUSTOM:
      if (!script.code) return null

      const scriptContent = script.code.includes('<script')
        ? script.code.replace(/<\/?script[^>]*>/g, '')
        : script.code

      return (
        <Script
          id={`script-${script.id || script.name || 'unnamed'}`}
          strategy={
            script.loadingStrategy === 'defer'
              ? 'lazyOnload'
              : script.loadingStrategy === 'async'
                ? 'afterInteractive'
                : 'beforeInteractive'
          }
        >
          {scriptContent}
        </Script>
      )

    default:
      return null
  }
}

function matchUrlPattern(pattern: string, currentPath: string): boolean {
  if (!pattern) return true

  const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/')

  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(currentPath)
}

export const CustomCode = async () => {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const currentPath = headersList.get('x-invoke-path') || '/'
  const host = headersList.get('host') || ''
  const domain = host.split(':')[0] || ''

  try {
    const tenantQuery = await payload.find({
      collection: 'tenants',
      where: {
        or: [{ domain: { equals: domain } }, { slug: { equals: domain.split('.')[0] || '' } }],
      },
      limit: 1,
    })

    const currentTenant = tenantQuery.docs[0]

    if (!currentTenant) {
      console.warn('No tenant found for domain:', domain)
      return {
        headScripts: null,
        bodyStartScripts: null,
        bodyEndScripts: null,
      }
    }

    const customCodes = await payload.find({
      collection: 'custom-codes',
      where: {
        and: [{ tenant: { equals: currentTenant.id } }, { 'scripts.isEnabled': { equals: true } }],
      },
    })

    const allScripts = customCodes.docs.flatMap((doc: CustomCodeType) => doc.scripts || [])

    const headScripts: React.ReactElement[] = []
    const bodyStartScripts: React.ReactElement[] = []
    const bodyEndScripts: React.ReactElement[] = []

    allScripts.forEach((script) => {
      if (!script.isEnabled) {
        return
      }

      if (script.urlPattern && !matchUrlPattern(script.urlPattern, currentPath)) {
        return
      }

      const scriptElement = (
        <ScriptRenderer key={`script-${script.id || script.name || 'unnamed'}`} script={script} />
      )

      switch (script.position || 'head') {
        case 'head':
          headScripts.push(scriptElement)
          break
        case 'body-start':
          bodyStartScripts.push(scriptElement)
          break
        case 'body-end':
          bodyEndScripts.push(scriptElement)
          break
      }
    })

    const result = {
      headScripts: headScripts.length > 0 ? headScripts : null,
      bodyStartScripts: bodyStartScripts.length > 0 ? bodyStartScripts : null,
      bodyEndScripts: bodyEndScripts.length > 0 ? bodyEndScripts : null,
    }
    return result
  } catch (error) {
    console.error('Error in CustomCode component:', error instanceof Error ? error.message : error)
    return {
      headScripts: null,
      bodyStartScripts: null,
      bodyEndScripts: null,
    }
  }
}
