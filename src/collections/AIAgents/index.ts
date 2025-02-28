import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'
import { superAdminOrTenantAdminAccess } from './access'

const AIAgents: CollectionConfig = {
  slug: 'ai-agents',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticated,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    group: 'AI Tools',
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the AI agent',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this AI agent does',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Enable or disable this AI agent',
      },
    },
    {
      name: 'systemPrompt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The system prompt that defines the AI agent behavior',
      },
    },
    {
      name: 'promptTemplates',
      type: 'array',
      admin: {
        description: 'Custom prompt templates for specific scenarios',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of this prompt template',
          },
        },
        {
          name: 'prompt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The prompt template text',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Description of when to use this prompt template',
          },
        },
      ],
    },
    {
      name: 'ragSettings',
      type: 'group',
      admin: {
        description: 'Retrieval-Augmented Generation settings',
      },
      fields: [
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable RAG capabilities for this agent',
          },
        },
        {
          name: 'documents',
          type: 'relationship',
          relationTo: 'media',
          hasMany: true,
          admin: {
            description: 'Documents to be used for knowledge retrieval',
            condition: (data) => data?.ragSettings?.isEnabled,
          },
        },
        {
          name: 'contextPrompt',
          type: 'textarea',
          admin: {
            description: 'Custom prompt for how to use retrieved context',
            condition: (data) => data?.ragSettings?.isEnabled,
          },
        },
      ],
    },
    {
      name: 'humanLikeResponseSettings',
      type: 'group',
      admin: {
        description: 'Settings for human-like response simulation',
      },
      fields: [
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable human-like response simulation',
          },
        },
        {
          name: 'typingSpeed',
          type: 'number',
          defaultValue: 30,
          admin: {
            description: 'Characters per second typing speed',
            condition: (data) => data?.humanLikeResponseSettings?.isEnabled,
          },
        },
        {
          name: 'pauseBetweenSentences',
          type: 'number',
          defaultValue: 500,
          admin: {
            description: 'Pause between sentences in milliseconds',
            condition: (data) => data?.humanLikeResponseSettings?.isEnabled,
          },
        },
      ],
    },
    {
      name: 'aiModel',
      type: 'select',
      required: true,
      defaultValue: 'gpt-4',
      options: [
        {
          label: 'GPT-4',
          value: 'gpt-4',
        },
        {
          label: 'GPT-4 Turbo',
          value: 'gpt-4-turbo',
        },
        {
          label: 'GPT-3.5 Turbo',
          value: 'gpt-3.5-turbo',
        },
        {
          label: 'Claude 3 Opus',
          value: 'claude-3-opus',
        },
        {
          label: 'Claude 3 Sonnet',
          value: 'claude-3-sonnet',
        },
        {
          label: 'Claude 3 Haiku',
          value: 'claude-3-haiku',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'AI model to use for this agent',
      },
    },
    {
      name: 'temperature',
      type: 'number',
      min: 0,
      max: 2,
      defaultValue: 0.7,
      admin: {
        position: 'sidebar',
        description: 'Temperature setting for the AI model (0-2)',
      },
    },
    {
      name: 'maxTokens',
      type: 'number',
      min: 100,
      max: 16000,
      defaultValue: 4000,
      admin: {
        position: 'sidebar',
        description: 'Maximum tokens for AI response',
      },
    },
    ...slugField(),
  ],
}

export default AIAgents
