import { Meta, StoryObj } from '@storybook/react'
import { FormBlock } from './Component'

const meta: Meta<typeof FormBlock> = {
  title: 'Blocks/Form',
  component: FormBlock,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/forms',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto max-w-7xl p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof FormBlock>

const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ text: '📝 Please fill out the form below', type: 'text', version: 1 }],
        direction: 'ltr' as 'ltr' | 'rtl' | null,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as 'ltr' | 'rtl' | null,
    format: '' as const,
    indent: 0,
    version: 1,
  },
}

export const BasicForm: Story = {
  args: {
    blockType: 'formBlock',
    enableIntro: true,
    introContent: mockRichText,
    form: {
      id: 'basic-form',
      title: 'Basic Form',
      submitButtonLabel: 'Submit',
      confirmationType: 'message',
      confirmationMessage: mockRichText,
      emails: [
        {
          emailTo: 'admin@example.com',
          emailFrom: 'noreply@example.com',
          subject: 'New Form Submission',
        },
      ],
      fields: [
        {
          blockType: 'text',
          name: 'fullName',
          label: 'Full Name',
          required: true,
          width: 100,
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
          width: 100,
        },
        {
          blockType: 'textarea',
          name: 'message',
          label: 'Your Message',
          required: true,
          width: 100,
        },
      ],
    },
  },
}

export const ComplexForm: Story = {
  args: {
    blockType: 'formBlock',
    enableIntro: true,
    introContent: mockRichText,
    form: {
      id: 'complex-form',
      title: 'Complex Form',
      submitButtonLabel: 'Send Request',
      confirmationType: 'message',
      confirmationMessage: mockRichText,
      emails: [
        {
          emailTo: 'sales@example.com',
          emailFrom: 'noreply@example.com',
          subject: 'New Complex Form Submission',
        },
      ],
      fields: [
        {
          blockType: 'text',
          name: 'firstName',
          label: 'First Name',
          required: true,
          width: 100,
        },
        {
          blockType: 'text',
          name: 'lastName',
          label: 'Last Name',
          required: true,
          width: 100,
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
          width: 100,
        },
        {
          blockType: 'select',
          name: 'interest',
          label: 'Area of Interest',
          required: true,
          options: [
            { label: 'Consulting', value: 'consulting' },
            { label: 'Development', value: 'development' },
            { label: 'Design', value: 'design' },
          ],
          width: 100,
        },
        {
          blockType: 'country',
          name: 'country',
          label: 'Country',
          required: true,
          width: 100,
        },
        {
          blockType: 'state',
          name: 'state',
          label: 'State/Province',
          required: true,
          width: 100,
        },
        {
          blockType: 'text',
          name: 'budget',
          label: 'Budget (USD)',
          required: true,
          width: 100,
        },
        {
          blockType: 'checkbox',
          name: 'subscribe',
          label: 'Subscribe to newsletter',
          defaultValue: false,
          width: 100,
        },
        {
          blockType: 'textarea',
          name: 'projectDetails',
          label: 'Project Details',
          required: true,
          width: 100,
        },
      ],
    },
  },
}
