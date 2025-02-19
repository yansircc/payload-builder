'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA10Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA10Store } from './store'

const fields: Array<keyof CTA10Fields> = ['title', 'subtitle', 'links']

export const CTA10Client = withFieldRegistration<CTA10Fields>({
  fields,
  useStore: useCTA10Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA10Client
