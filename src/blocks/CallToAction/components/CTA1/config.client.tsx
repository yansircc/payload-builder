'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA1Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA1Store } from './store'

const fields: Array<keyof CTA1Fields> = ['title', 'subtitle', 'icon', 'btn']

export const CTA1Client = withFieldRegistration<CTA1Fields>({
  fields,
  useStore: useCTA1Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA1Client
