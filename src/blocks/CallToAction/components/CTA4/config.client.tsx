'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA4Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA4Store } from './store'

const fields: Array<keyof CTA4Fields> = ['title', 'subtitle', 'links', 'lists']

export const CTA4Client = withFieldRegistration<CTA4Fields>({
  fields,
  useStore: useCTA4Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA4Client
