import type { Page } from '@/payload-types'

// Used for pre-seeded content so that the homepage is not empty
// @ts-expect-error: 类型错误
export const homeStatic: Page = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'none',
  },
  meta: {
    description: 'An open-source website built with Payload and Next.js.',
    title: 'Payload Website Template',
  },
  title: 'Home',
}
