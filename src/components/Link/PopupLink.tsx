'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, ButtonProps } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popup } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface PopupLinkProps {
  popup: Popup
  label: string
  appearance?: 'inline' | ButtonProps['variant']
  className?: string
}

const STORAGE_PREFIX = 'popup_shown_'

function getStorageKey(popupId: string) {
  return `${STORAGE_PREFIX}${popupId}`
}

function shouldShowPopup(popup: Popup): boolean {
  if (!popup.triggerSettings?.frequency || popup.triggerSettings.frequency === 'always') {
    return true
  }

  const storageKey = getStorageKey(popup.id)
  const lastShown = localStorage.getItem(storageKey)

  if (!lastShown) return true

  const now = new Date().getTime()
  const lastShownTime = parseInt(lastShown, 10)

  switch (popup.triggerSettings.frequency) {
    case 'once':
      return false
    case 'session':
      return !sessionStorage.getItem(storageKey)
    case 'daily':
      return now - lastShownTime > 24 * 60 * 60 * 1000
    case 'weekly':
      return now - lastShownTime > 7 * 24 * 60 * 60 * 1000
    default:
      return true
  }
}

function markPopupAsShown(popup: Popup) {
  const storageKey = getStorageKey(popup.id)
  const now = new Date().getTime().toString()

  if (popup.triggerSettings?.frequency === 'session') {
    sessionStorage.setItem(storageKey, now)
  } else {
    localStorage.setItem(storageKey, now)
  }
}

export function PopupLink({ popup, label, appearance = 'default', className }: PopupLinkProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Handle automatic triggers
  useEffect(() => {
    if (!popup.triggerSettings || popup.triggerSettings.triggerType === 'manual') {
      return
    }

    if (!shouldShowPopup(popup)) {
      return
    }

    const handleTrigger = () => {
      setIsOpen(true)
      markPopupAsShown(popup)
    }

    switch (popup.triggerSettings.triggerType) {
      case 'pageLoad':
        const delay = (popup.triggerSettings.delay || 0) * 1000
        const timer = setTimeout(handleTrigger, delay)
        return () => clearTimeout(timer)

      case 'scrollDepth':
        const handleScroll = () => {
          const scrollPercentage =
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
          if (scrollPercentage >= (popup.triggerSettings.scrollDepthPercentage || 50)) {
            handleTrigger()
            window.removeEventListener('scroll', handleScroll)
          }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

      case 'exitIntent':
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            handleTrigger()
            document.removeEventListener('mouseleave', handleMouseLeave)
          }
        }
        document.addEventListener('mouseleave', handleMouseLeave)
        return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [popup, pathname])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open && popup.triggerSettings?.triggerType === 'manual') {
      markPopupAsShown(popup)
    }
  }

  const dialogContentClass = cn(
    'transition-all duration-300',
    {
      'animate-in fade-in-0': popup.appearanceSettings?.animation === 'fade',
      'animate-in slide-in-from-bottom-full': popup.appearanceSettings?.animation === 'slideUp',
      'animate-in slide-in-from-top-full': popup.appearanceSettings?.animation === 'slideDown',
      'animate-in zoom-in-50': popup.appearanceSettings?.animation === 'scale',
    },
    {
      'from-center': popup.appearanceSettings?.position === 'center',
      'from-top': popup.appearanceSettings?.position === 'top',
      'from-bottom': popup.appearanceSettings?.position === 'bottom',
    },
  )

  const overlayClass = cn({
    'backdrop-blur-sm': popup.appearanceSettings?.backdrop === 'blur',
    'bg-background/80': popup.appearanceSettings?.backdrop !== 'none',
    'bg-transparent': popup.appearanceSettings?.backdrop === 'none',
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTitle className="sr-only">{label}</DialogTitle>
      <DialogTrigger asChild>
        {appearance !== 'inline' ? (
          <Button variant={appearance} className={className}>
            {label}
          </Button>
        ) : (
          <NextLink className={cn(className)} href={'#'}>
            {label}
          </NextLink>
        )}
      </DialogTrigger>
      <DialogContent
        size={popup.appearanceSettings?.size || 'default'}
        className={dialogContentClass}
        overlayClassName={overlayClass}
      >
        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
          {popup.basicSettings.content}
        </div>
      </DialogContent>
    </Dialog>
  )
}
