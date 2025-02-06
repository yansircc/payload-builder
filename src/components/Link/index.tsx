'use client'

import { Popup } from '@/components/Popup'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { Page, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { DynamicIcon } from '../DynamicIcon'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'popup' | null
  url?: string | null
  prefixIcon?: string | null
  suffixIcon?: string | null
  popup?:
    | string
    | {
        id?: string
        relationTo?: string
      }
    | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    prefixIcon,
    suffixIcon,
    popup,
  } = props

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Handle popup type
  if (type === 'popup' && popup) {
    const popupId = typeof popup === 'string' ? popup : popup.id
    if (!popupId) return null

    const content = (
      <>
        {prefixIcon && (
          <DynamicIcon name={prefixIcon} className="mr-2 size-4" />
        )}
        {label}
        {children}
        {suffixIcon && (
          <DynamicIcon name={suffixIcon} className="ml-2 size-4" />
        )}
      </>
    )

    return (
      <>
        <Button
          variant={appearance === 'inline' ? 'default' : appearance}
          size={sizeFromProps}
          className={className}
          onClick={() => setIsPopupOpen(true)}
        >
          {content}
        </Button>
        <Popup
          id={popupId}
          isOpen={isPopupOpen}
          onOpenChange={setIsPopupOpen}
        />
      </>
    )
  }

  const href =
    type === 'reference' &&
    typeof reference?.value === 'object' &&
    reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'inline' ? undefined : sizeFromProps
  const newTabProps = newTab
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {}

  const content = (
    <>
      {prefixIcon && <DynamicIcon name={prefixIcon} className="mr-2 size-4" />}
      {label}
      {children}
      {suffixIcon && <DynamicIcon name={suffixIcon} className="ml-2 size-4" />}
    </>
  )

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <NextLink className={cn(className)} href={href || ''} {...newTabProps}>
        {content}
      </NextLink>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <NextLink href={href || ''} {...newTabProps}>
        {content}
      </NextLink>
    </Button>
  )
}
