'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA16Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA16Store } from './store'

const fields: Array<keyof CTA16Fields> = ['title', 'subtitle', 'icon', 'image', 'links']

export const CTA16Client = withFieldRegistration<CTA16Fields>({
  fields,
  useStore: useCTA16Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA16Client
