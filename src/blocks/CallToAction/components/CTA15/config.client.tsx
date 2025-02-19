'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA15Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA15Store } from './store'

const fields: Array<keyof CTA15Fields> = ['heading', 'title', 'subtitle', 'image', 'links']

export const CTA15Client = withFieldRegistration<CTA15Fields>({
  fields,
  useStore: useCTA15Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA15Client
