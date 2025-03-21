import type React from 'react'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import type { Page, Post } from '@/payload-types'
import { getCachedDocument } from '@/utilities/getDocument'
import { getRedirects } from '@/utilities/getRedirects'
import { getTenantFromDomain } from '@/utilities/getTenant'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const tenant = await getTenantFromDomain()
  const redirects = await getRedirects(1, tenant?.id || '')

  const redirectItem = redirects?.find((redirect) => redirect.from === url)

  if (redirectItem) {
    const isPermanent = redirectItem.type === '301'

    if (redirectItem.to?.url) {
      if (isPermanent) {
        permanentRedirect(redirectItem.to.url)
      } else {
        redirect(redirectItem.to.url)
      }
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        document?.slug
      }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) {
      if (isPermanent) {
        permanentRedirect(redirectUrl)
      } else {
        redirect(redirectUrl)
      }
    }
  }

  if (disableNotFound) return null

  notFound()
}
