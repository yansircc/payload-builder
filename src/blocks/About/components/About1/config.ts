import type { Field, GroupField } from 'payload'
import { z } from 'zod'
import { aboutSchemas, featureFields } from '../shared/base-field'

/**
 * About1 field validation and type definitions
 */
export const schemas = {
  mainSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),
  missionSection: z.object({
    label: aboutSchemas.label,
    description: aboutSchemas.description,
  }),
  featuresSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    features: z.array(aboutSchemas.feature),
  }),
  teamSection: z.object({
    label: aboutSchemas.label,
    title: aboutSchemas.title,
    image: aboutSchemas.media,
    description: aboutSchemas.description,
  }),
}

const labelField = (description: string): Field => ({
  name: 'label',
  type: 'text',
  required: true,
  admin: {
    description,
  },
})

const featureArrayField: Field = {
  name: 'features',
  type: 'array',
  minRows: 1,
  maxRows: 3,
  fields: [
    {
      ...featureFields.icon,
      options: ['Files', 'CircleArrowRight', 'Settings'],
      admin: {
        description: 'Select an icon for this feature',
      },
    },
    featureFields.title,
    featureFields.description,
  ],
}

/**
 * Complete configuration for About1
 */
export const about1Fields: GroupField = {
  name: 'about-1',
  interfaceName: 'About1Fields',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'group',
      name: 'mainSection',
      label: 'Main Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'missionSection',
      label: 'Mission Section',
      fields: [
        labelField('Mission section label (e.g., "OUR MISSION")'),
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'featuresSection',
      label: 'Features Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        featureArrayField,
      ],
    },
    {
      type: 'group',
      name: 'teamSection',
      label: 'Team Section',
      fields: [
        labelField('Team section label (e.g., "JOIN OUR TEAM")'),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  admin: {
    description: 'Modern about section with mission, features, and team sections',
  },
}
