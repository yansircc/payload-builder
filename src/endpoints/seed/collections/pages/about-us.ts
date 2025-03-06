import type { Page } from '@/payload-types'

// Used for pre-seeded content for the about us page
export const aboutUs: Partial<Page> = {
  slug: 'about-us',
  fullPath: '/home/about-us',
  _status: 'published',
  title: 'About Us',
  hero: {
    'hero-1': {
      title: 'About Our Company',
      subtitle: 'Learn about our mission, values, and the team behind our success',
      image: '{{IMAGE_1}}',
      badge: 'Our Story',
      links: [
        {
          'link-1': {
            type: 'custom',
            url: '/',
            label: 'Back to Home',
            prefixIcon: 'ArrowLeft',
            appearance: 'default',
          },
          'link-2': {
            type: 'custom',
            url: '/contact',
            label: 'Contact Us',
            suffixIcon: 'ArrowRight',
            appearance: 'outline',
          },
        },
      ],
    },
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      text: 'Our Mission',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We are dedicated to delivering exceptional value through innovative solutions and unwavering commitment to quality. Our mission is to empower businesses and individuals with cutting-edge technology while maintaining the highest standards of service and support.',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      text: 'Our Values',
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: "• Innovation: Constantly pushing boundaries and exploring new possibilities\n• Quality: Delivering excellence in everything we do\n• Integrity: Operating with transparency and ethical standards\n• Customer Focus: Putting our clients' needs at the heart of our decisions\n• Collaboration: Working together to achieve exceptional results",
                      version: 1,
                    },
                  ],
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      ],
    },
  ],
  meta: {
    title: 'About Us - Learn About Our Company and Values',
    description:
      "Discover our company's mission, values, and the dedicated team driving our success. Learn about our commitment to innovation and excellence.",
  },
}
