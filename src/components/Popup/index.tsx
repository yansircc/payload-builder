'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/utilities/ui'
import { useCallback, useEffect, useState } from 'react'

interface PopupProps {
  id: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

interface PopupData {
  id: string
  title: string
  enabled: boolean
  description: string
  ctaLabel: string
  ctaStyle: 'default' | 'outline' | 'ghost'
  type: 'reference' | 'custom'
  reference?: {
    value: {
      slug: string
    }
  }
  url?: string
}

export function Popup({
  id,
  isOpen: controlledIsOpen,
  onOpenChange,
}: PopupProps) {
  const [popup, setPopup] = useState<PopupData | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  console.log(popup)

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      onOpenChange?.(open)
    },
    [onOpenChange]
  )

  const fetchPopup = useCallback(async () => {
    if (!id) return

    try {
      const res = await fetch(`/api/popups/${id}`)

      if (!res.ok) throw new Error('Failed to fetch popup')

      const data = await res.json()

      if (data?.enabled) {
        setPopup(data)
        if (typeof controlledIsOpen === 'undefined') {
          setIsOpen(true)
        }
      }
    } catch (err) {
      console.error('Error fetching popup:', err)
    }
  }, [id, controlledIsOpen])

  const handleCtaClick = useCallback(() => {
    handleOpenChange(false)

    if (!popup) return

    const { type, reference, url } = popup
    if (type === 'reference' && reference?.value?.slug) {
      window.location.href = `/${reference.value.slug}`
    } else if (type === 'custom' && url) {
      window.open(url, '_blank')
    }
  }, [popup, handleOpenChange])

  useEffect(() => {
    fetchPopup()
  }, [fetchPopup])

  useEffect(() => {
    if (typeof controlledIsOpen !== 'undefined') {
      setIsOpen(controlledIsOpen)
    }
  }, [controlledIsOpen])

  if (!popup?.enabled) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTitle className="sr-only">{popup?.title}</DialogTitle>
      <DialogContent className="sm:max-w-[425px]">
        <PopupContent popup={popup} onCtaClick={handleCtaClick} />
      </DialogContent>
    </Dialog>
  )
}

interface PopupContentProps {
  popup: PopupData
  onCtaClick: () => void
}

function PopupContent({ popup, onCtaClick }: PopupContentProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">{popup.title}</DialogTitle>
        <DialogDescription className="text-center whitespace-pre-wrap">
          {popup.description}
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center">
        <Button
          variant={popup.ctaStyle}
          onClick={onCtaClick}
          className={cn(
            'mt-6 w-full sm:w-auto',
            popup.ctaStyle === 'ghost' && 'hover:bg-secondary'
          )}
        >
          {popup.ctaLabel}
        </Button>
      </div>
    </>
  )
}
