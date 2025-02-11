'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Button, ButtonProps } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Popup } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface PopupLinkProps {
  popup: Popup
  label: string
  appearance?: 'inline' | ButtonProps['variant']
  className?: string
}

export function PopupLink({ popup, label, appearance = 'default', className }: PopupLinkProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
      <DialogContent size={popup.size || 'default'}>
        <RenderBlocks blocks={popup.layout} />
      </DialogContent>
    </Dialog>
  )
}
