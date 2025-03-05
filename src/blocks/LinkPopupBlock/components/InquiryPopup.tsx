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
    <div className="inquiry-pop-trigger hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="popup-content bg-background p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inquiry Form</h2>
          <button className="close-popup text-2xl hover:opacity-70 transition-opacity">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This is a sample popup content with proper styling.
          </p>
          <div className="flex justify-end">
            <button className="close-popup px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
