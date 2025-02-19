'use client'

import { GroupField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA3Fields } from '@/payload-types'
import { withFieldRegistration } from '../shared/hoc'
import { useCTA3Store } from './store'

const fields: Array<keyof CTA3Fields> = ['title', 'subtitle', 'buttons', 'list']

export const CTA3Client = withFieldRegistration<CTA3Fields>({
  fields,
  useStore: useCTA3Store,
  Component: (props: GroupFieldClientProps) => (
    <div className="space-y-4">
      <GroupField {...props} />
    </div>
  ),
})

export default CTA3Client
