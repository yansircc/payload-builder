import React from 'react'
import type { HTMLBlock as HTMLBlockProps } from '@/payload-types'

export const HTMLBlock: React.FC<HTMLBlockProps> = ({ content }) => {
  return (
    <>
      {content && (
        <div className="overflow-x-auto border border-border rounded-md p-4 bg-card">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </>
  )
}
