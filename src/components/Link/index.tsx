import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Page, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { DynamicIcon } from '../DynamicIcon'

type PopupContent = {
  title?: string | null
  description?: string | null
  content?: any // We'll type this properly once we know the rich text structure
}

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
  popupContent?: PopupContent | null
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
    popupContent,
  } = props

  const content = (
    <>
      {prefixIcon && <DynamicIcon name={prefixIcon} className="mr-2 size-4" />}
      {label}
      {children}
      {suffixIcon && <DynamicIcon name={suffixIcon} className="ml-2 size-4" />}
    </>
  )

  // Handle popup type
  if (type === 'popup' && popupContent) {
    const size = appearance === 'inline' ? undefined : sizeFromProps
    return (
      <Dialog>
        <DialogTrigger asChild>
          {appearance === 'inline' ? (
            <button className={cn(className)}>{content}</button>
          ) : (
            <Button className={className} size={size} variant={appearance}>
              {content}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          {(popupContent.title || popupContent.description) && (
            <DialogHeader>
              {popupContent.title && (
                <DialogTitle>{popupContent.title}</DialogTitle>
              )}
              {popupContent.description && (
                <DialogDescription>
                  {popupContent.description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          {/* {popupContent.content} */}
        </DialogContent>
      </Dialog>
    )
  }

  // Handle regular link types
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

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {content}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {content}
      </Link>
    </Button>
  )
}
