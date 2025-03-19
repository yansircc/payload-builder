'use client'

import React from 'react'
import Link from 'next/link'

export const SchemaDocsLink: React.FC = () => {
  return (
    <li>
      <Link href="/admin/schema-docs" prefetch={false}>
        Schema.org Docs
      </Link>
    </li>
  )
}

export default SchemaDocsLink
