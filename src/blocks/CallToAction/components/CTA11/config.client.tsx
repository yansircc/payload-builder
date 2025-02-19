'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA11Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA11Store } from './store'

const fields: Array<keyof CTA11Fields> = ['title', 'subtitle', 'links']

export const CTA11Client = withFieldRegistration<CTA11Fields>({
  fields,
  useStore: useCTA11Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA11Client
