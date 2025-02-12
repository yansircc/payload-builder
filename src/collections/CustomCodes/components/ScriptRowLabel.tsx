'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'
import './ScriptRowLabel.scss'

const ScriptRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    name?: string
    type?: string
    isEnabled?: boolean
  }>()

  return (
    <div className="script-row-label">
      <span className="script-row-label__name">
        {data?.name || `Script ${String(rowNumber).padStart(2, '0')}`}
      </span>
      <span
        className={`script-row-label__pill ${data?.isEnabled ? 'script-row-label__pill--enabled' : 'script-row-label__pill--disabled'}`}
      >
        {data?.isEnabled ? 'Enabled' : 'Disabled'}
      </span>
      {data?.type && (
        <span className="script-row-label__pill script-row-label__pill--type">
          {data.type === 'google-analytics'
            ? 'GA4'
            : data.type === 'google-tag-manager'
              ? 'GTM'
              : 'Custom'}
        </span>
      )}
    </div>
  )
}

export default ScriptRowLabel
