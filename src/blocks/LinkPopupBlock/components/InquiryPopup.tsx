'use client'

import React, { useEffect } from 'react'

export const InquiryPopup = () => {
  useEffect(() => {
    const closePopup = () => {
      document.querySelector('.inquiry-pop-trigger')?.classList.add('hidden')
    }

    document.querySelectorAll('.close-popup').forEach((btn) => {
      btn.addEventListener('click', closePopup)
    })

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="inquiry-pop-trigger hidden fixed inset-0 bg-black/50 z-50">
      <div className="popup-content">
        <button className="close-popup">×</button>
      </div>
    </div>
  )
}
