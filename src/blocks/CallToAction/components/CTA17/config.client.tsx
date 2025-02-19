'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA17Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA17Store } from './store'

const fields: Array<keyof CTA17Fields> = ['title', 'subtitle', 'links']

export const CTA17Client = withFieldRegistration<CTA17Fields>({
  fields,
  useStore: useCTA17Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA17Client
