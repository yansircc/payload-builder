import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { headers } from 'next/headers'
import type { CustomCode } from '@/payload-types'

type LoadingStrategy = NonNullable<CustomCode['scripts'][number]['loadingStrategy']>

interface ScriptProps {
  code: string
  loadingStrategy: LoadingStrategy
}

function Script({ code, loadingStrategy }: ScriptProps) {
  const props: Record<string, unknown> = {
    dangerouslySetInnerHTML: { __html: code },
  }

  if (loadingStrategy === 'async') props.async = true
  if (loadingStrategy === 'defer') props.defer = true

  return <script {...props} />
}

function matchUrlPattern(pattern: string, currentPath: string): boolean {
  if (!pattern) return true

  // Convert URL pattern to regex
  const regexPattern = pattern
    .replace(/\*/g, '.*') // Convert * to .*
    .replace(/\//g, '\\/') // Escape forward slashes

  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(currentPath)
}

export const CustomCodeComponent = async () => {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const currentPath = headersList.get('x-invoke-path') || '/'

  try {
    const customCodes = await payload.find({
      collection: 'custom-codes',
      where: {
        'scripts.isEnabled': { equals: true },
      },
    })

    const allScripts = customCodes.docs.flatMap((doc: CustomCode) => doc.scripts || [])

    const headScripts: React.ReactElement[] = []
    const bodyStartScripts: React.ReactElement[] = []
    const bodyEndScripts: React.ReactElement[] = []

    allScripts.forEach((script) => {
      // Check both isEnabled and URL pattern
      if (!script.isEnabled) return
      if (script.urlPattern && !matchUrlPattern(script.urlPattern, currentPath)) return

      const scriptElement = (
        <Script
          key={`script-${script.id || script.name || 'unnamed'}`}
          code={script.code}
          loadingStrategy={script.loadingStrategy || 'sync'}
        />
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

    return {
      headScripts: headScripts.length > 0 ? headScripts : null,
      bodyStartScripts: bodyStartScripts.length > 0 ? bodyStartScripts : null,
      bodyEndScripts: bodyEndScripts.length > 0 ? bodyEndScripts : null,
    }
  } catch (error) {
    console.error('Error in CustomCode component:', error)
    return null
  }
}
