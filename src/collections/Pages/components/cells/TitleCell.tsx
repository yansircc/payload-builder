'use client'

import type { DefaultCellComponentProps } from 'payload'
import React from 'react'
import Link from 'next/link'

function formatPathSegment(segment: string): string {
  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const TitleCell: React.FC<DefaultCellComponentProps> = (props) => {
  const { rowData, collectionSlug } = props
  const fullPath = rowData.fullPath as string

  // Split the path and remove empty segments
  const segments = fullPath.split('/').filter(Boolean)

  // Format each segment and join with arrows
  const formattedPath = segments.map(formatPathSegment).join(' → ')

  return (
    <Link
      href={`/admin/collections/${collectionSlug}/${rowData.id}`}
      className="whitespace-nowrap font-mono"
    >
      {formattedPath || 'No title'}
    </Link>
  )
}
