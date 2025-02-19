'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA5Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA5Store } from './store'

const fields: Array<keyof CTA5Fields> = ['title', 'subtitle', 'image', 'links']

export const CTA5Client = withFieldRegistration<CTA5Fields>({
  fields,
  useStore: useCTA5Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA5Client
