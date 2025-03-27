'use client'

import { NavGroup } from '@payloadcms/ui'
import React from 'react'
import Link from 'next/link'

export const DocsNavigation: React.FC = () => {
  return (
    <NavGroup label="Docs">
      <Link href="/admin/schema-docs" prefetch={false}>
        Schema.org Docs
      </Link>
    </NavGroup>
  )
}

export default DocsNavigation
