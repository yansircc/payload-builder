'use client'

import type { PopupTriggerBlock as PopupTriggerBlockProps } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  customAttributes?: Record<string, any>
} & PopupTriggerBlockProps

export const PopupTriggerBlock: React.FC<Props> = ({
  className,
  triggerText,
  triggerType,
  popupClass = 'inquiry-pop-trigger',
  triggerAction,
  customAttributes,
}) => {
  const parsedAttributes = parseCustomAttributes(customAttributes)

  const handleTrigger = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const targetPopup = document.querySelector(`.${popupClass}`)
    targetPopup?.classList.toggle('hidden')

    if (triggerAction === 'hover') {
      targetPopup?.addEventListener('mouseleave', () => targetPopup.classList.add('hidden'))
    }
  }

  const eventProps = {
    ...(triggerAction === 'click' && { onClick: handleTrigger }),
    ...(triggerAction === 'hover' && { onMouseEnter: handleTrigger }),
    ...(triggerAction === 'focus' && { onFocus: handleTrigger }),
  }

  return (
    <div className={cn('popup-trigger-wrapper', className || '')}>
      {renderTriggerElement(
        triggerType || 'button',
        parsedAttributes,
        eventProps,
        triggerText || '',
        popupClass || '',
      )}
    </div>
  )
}

const parseCustomAttributes = (attrs: any): Record<string, any> => {
  if (typeof attrs === 'string') {
    try {
      return JSON.parse(attrs)
    } catch (error) {
      console.error('Invalid JSON:', attrs)
      return {}
    }
  }
  return attrs || {}
}

const renderTriggerElement = (
  type: string,
  attrs: any,
  events: any,
  text: string,
  popupClass: string,
) => {
  const baseClasses = cn(popupClass, 'transition-all duration-200', attrs?.className)

  switch (type) {
    case 'button':
      return (
        <button
          {...attrs}
          {...events}
          className={cn(baseClasses, 'btn-primary')}
          aria-haspopup="dialog"
        >
          {text}
        </button>
      )

    case 'link':
      return (
        <a
          {...attrs}
          {...events}
          className={cn(baseClasses, 'text-link hover:underline')}
          href={attrs?.href || '#'}
          role="button"
          aria-haspopup="dialog"
        >
          {text}
        </a>
      )

    case 'image':
      return (
        <img
          {...attrs}
          {...events}
          className={cn(baseClasses, 'cursor-pointer')}
          src={attrs?.src || '/default-image.jpg'}
          alt={text}
          role="button"
          aria-haspopup="dialog"
        />
      )

    default:
      return null
  }
}
