'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA7Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA7Store } from './store'

const fields: Array<keyof CTA7Fields> = ['title', 'subtitle', 'links', 'lists']

export const CTA7Client = withFieldRegistration<CTA7Fields>({
  fields,
  useStore: useCTA7Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA7Client
