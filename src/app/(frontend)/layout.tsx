import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { AdminBar } from '@/components/AdminBar'
import { RenderFooter } from '@/globals/Footer/RenderFooter'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'
import './globals.css'
import { inter, outfit } from '@/config/fonts'
import { CustomCode } from '@/globals/CustomCode/Component'
import { Favicon } from '@/globals/Favicon/Component'
import { RenderHeader } from '@/globals/Header/RenderHeader'
import { getSiteSettingsFromDomain } from '@/utilities/getSiteSettings'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const customScripts = await CustomCode()
  const siteSettings = await getSiteSettingsFromDomain()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, inter.variable, outfit.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <Favicon />
        {customScripts?.headScripts}
        {siteSettings?.searchEngineVisibility?.allowIndexing === false && (
          <meta content="noindex,nofollow" name="robots" />
        )}
      </head>
      <body>
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />

          {customScripts?.bodyStartScripts}
          <RenderHeader />
          {children}
          <RenderFooter />
          {customScripts?.bodyEndScripts}
        </Providers>
      </body>
    </html>
  )
}

export const generateMetadata = async (): Promise<Metadata> => {
  const siteSettings = await getSiteSettingsFromDomain()

  return {
    metadataBase: new URL(getServerSideURL()),
    title: siteSettings?.title,
    description: siteSettings?.description,
    openGraph: mergeOpenGraph({
      title: siteSettings?.title,
      description: siteSettings?.description,
    }),
    twitter: { card: 'summary_large_image', creator: '@payloadcms' },
    robots:
      siteSettings?.searchEngineVisibility?.allowIndexing === false
        ? { index: false, follow: false }
        : undefined,
  }
}
