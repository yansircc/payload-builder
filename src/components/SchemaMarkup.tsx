'use client'

import { FC } from 'react'

interface SchemaMarkupProps {
  jsonLd: Record<string, any> | Record<string, any>[] | string
}

/**
 * Renders JSON-LD structured data in a script tag
 *
 * Usage:
 * ```tsx
 * <SchemaMarkup jsonLd={jsonLdData} />
 * ```
 */
const SchemaMarkup: FC<SchemaMarkupProps> = ({ jsonLd }) => {
  const jsonLdString = typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd)

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
}

export default SchemaMarkup
