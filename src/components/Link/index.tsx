import React from 'react'
import NextLink from 'next/link'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { Page, Popup, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { DynamicIcon } from '../DynamicIcon'
import { PopupLink } from './PopupLink'

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
  popup?: Popup | string | null
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

  if (type === 'popup' && popup && typeof popup === 'object') {
    return (
      <PopupLink popup={popup} label={label || ''} appearance={appearance} className={className} />
    )
  }

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  const size = appearance === 'inline' ? undefined : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const content = (
    <>
      {prefixIcon && <DynamicIcon name={prefixIcon} className="mr-2 size-4" />}
      {label}
      {children}
      {suffixIcon && <DynamicIcon name={suffixIcon} className="ml-2 size-4" />}
    </>
  )

  // Handle regular links
  if (appearance === 'inline') {
    return (
      <NextLink className={cn(className)} href={href || url || ''} {...newTabProps}>
        {content}
      </NextLink>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <NextLink className={cn(className)} href={href || url || ''} {...newTabProps}>
        {content}
      </NextLink>
    </Button>
  )
}
