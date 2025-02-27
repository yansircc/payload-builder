import type { Meta, StoryObj } from '@storybook/react'
import { InquiryPopup } from './components/InquiryPopup'
import { RenderLinkPopup } from './RenderLinkPopup'

const meta: Meta<typeof RenderLinkPopup> = {
  title: 'blocks/LinkPopup',
  component: RenderLinkPopup,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[400px] flex items-center justify-center">
        <Story />
        <InquiryPopup />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof RenderLinkPopup>
export const SimplePopupButton: Story = {
  args: {
    link: {
      type: 'popup',
      label: 'Open Popup',
      popup: {
        id: 'test-popup',
        title: 'Simple Popup',
        basicSettings: {
          title: 'Simple Popup',
          content: 'This is a test popup content',
        },
        triggerSettings: {
          triggerType: 'manual',
          frequency: 'always',
        },
        appearanceSettings: {
          size: 'default',
          animation: 'fade',
          position: 'center',
          backdrop: 'blur',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}

export const StyledPopupButton: Story = {
  args: {
    className: 'btn bg-primary text-white px-4 py-2 rounded',
    link: {
      type: 'popup',
      label: 'Click Me',
      popup: {
        id: 'styled-popup',
        title: 'Styled Popup',
        basicSettings: {
          title: 'Styled Popup',
          content: '### Welcome\n\nThis is a styled popup with markdown content.',
        },
        triggerSettings: {
          triggerType: 'manual',
          frequency: 'always',
        },
        appearanceSettings: {
          size: 'lg',
          animation: 'scale',
          position: 'center',
          backdrop: 'blur',
          backgroundColor: 'var(--background)',
          textColor: 'var(--foreground)',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}
export const ModernButton: Story = {
  args: {
    className:
      'group relative px-6 py-3 rounded-xl to-primary/1 bg-background  text-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5',
    link: {
      type: 'popup',
      label: '✨ Get Started',
      popup: {
        id: 'modern-popup',
        title: 'Welcome Aboard',
        basicSettings: {
          title: 'Start Your Journey',
          content:
            '### Welcome to the Future\n\nExplore our innovative solutions and transform your business today.',
        },
        triggerSettings: {
          triggerType: 'manual',
          frequency: 'always',
        },
        appearanceSettings: {
          size: 'lg',
          animation: 'scale',
          position: 'center',
          backdrop: 'blur',
          backgroundColor: 'var(--background)',
          textColor: 'var(--foreground)',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}

export const FloatingButton: Story = {
  args: {
    className:
      'px-8 py-4 rounded-full bg-background border border-border shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500 text-foreground/80 hover:text-foreground font-medium',
    link: {
      type: 'popup',
      label: '🎯 Learn More',
      popup: {
        id: 'floating-popup',
        title: 'Discover More',
        basicSettings: {
          title: 'Unlock Premium Features',
          content:
            '### Premium Experience\n\nDiscover our exclusive features and take your experience to the next level.',
        },
        triggerSettings: {
          triggerType: 'manual',
          frequency: 'always',
        },
        appearanceSettings: {
          size: 'default',
          animation: 'slideUp',
          position: 'center',
          backdrop: 'blur',
          backgroundColor: 'var(--background)',
          textColor: 'var(--foreground)',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}

export const GlassButton: Story = {
  args: {
    className:
      'group px-6 py-3 rounded-lg backdrop-blur-sm bg-background/100 dark:bg-background/1 border border-border/20 dark:border-border/10 hover:bg-accent/100 dark:hover:bg-accent/10 text-foreground dark:text-foreground/90 font-medium transition-all duration-300',
    link: {
      type: 'popup',
      label: '🌟 Explore Features',
      popup: {
        id: 'glass-popup',
        title: 'Feature Overview',
        basicSettings: {
          title: 'Powerful Features',
          content:
            '### Innovative Solutions\n\nDiscover how our features can help you achieve your goals faster.',
        },
        triggerSettings: {
          triggerType: 'manual',
          frequency: 'always',
        },
        appearanceSettings: {
          size: 'lg',
          animation: 'fade',
          position: 'center',
          backdrop: 'blur',
          backgroundColor: 'var(--background)',
          textColor: 'var(--foreground)',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}

export const MinimalistLink: Story = {
  args: {
    className:
      'relative text-muted-foreground dark:text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-primary dark:after:bg-primary/80 after:transition-transform after:duration-300 hover:after:scale-x-100',
    link: {
      type: 'popup',
      label: 'View Details',
      popup: {
        id: 'minimalist-popup',
        title: 'Product Details',
        basicSettings: {
          title: 'Product Information',
          content: '### Clean Design\n\nFocus on what matters most with our minimalist approach.',
        },
        triggerSettings: {
          triggerType: 'manual',
          frequency: 'always',
        },
        appearanceSettings: {
          size: 'default',
          animation: 'scale',
          position: 'center',
          backdrop: 'blur',
          backgroundColor: 'var(--background)',
          textColor: 'var(--foreground)',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}
