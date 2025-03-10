import type { Meta, StoryObj } from '@storybook/react'
import type { Media, Testimonial16Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial16',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

type TestimonialItem = NonNullable<Testimonial16Fields['testimonials']>[number]

const defaultTestimonials: TestimonialItem[] = [
  {
    authorName: 'Alex Thompson',
    tag: '@alexthompson',
    content:
      "Just tried the new features from @ourplatform and I'm absolutely blown away! The interface is intuitive and the performance is outstanding. This is exactly what we've been looking for. #GameChanger",
    authorImage: {
      id: 'avatar-1',
      alt: 'Alex Thompson',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    authorName: 'Maria Garcia',
    tag: '@mariagarcia',
    content:
      'Big shoutout to @ourplatform support team! They helped us implement complex features with ease. The documentation is comprehensive and the team is always responsive. Highly recommend! 🚀',
    authorImage: {
      id: 'avatar-1',
      alt: 'Maria Garcia',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    authorName: 'David Kim',
    tag: '@davidkim',
    content:
      "After switching to @ourplatform, our team's productivity increased by 50%. The automation features are incredible, and the learning curve is minimal. Best decision we made this quarter! #ProductivityBoost",
    authorImage: {
      id: 'avatar-1',
      alt: 'David Kim',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
]

export const Default: Story = {
  args: {
    heading: "Here's how our platform is making an impact",
    subheading: 'See what others are saying',
    testimonials: defaultTestimonials,
  },
}

export const WithoutImages: Story = {
  args: {
    ...Default.args,
    hideAuthorImages: true,
    testimonials: defaultTestimonials,
  },
}

export const SingleTestimonial: Story = {
  args: {
    ...Default.args,
    testimonials: [defaultTestimonials[0]] as TestimonialItem[],
  },
}
