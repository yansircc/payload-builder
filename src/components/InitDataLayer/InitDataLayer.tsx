'use client'

import { useEffect } from 'react'

export const InitDataLayer = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
    }
  }, [])

  return null
}
