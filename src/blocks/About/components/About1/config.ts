import type { GroupField } from 'payload'
import { z } from 'zod'
import {
  aboutSchemas,
  baseFields,
  createArrayField,
  createSectionField,
} from '../shared/base-field'

/**
 * About1 field validation and type definitions
 */
export const schemas = {
  mainSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),
  missionSection: aboutSchemas.section.mission,
  featuresSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    features: z.array(aboutSchemas.feature),
  }),
  teamSection: aboutSchemas.section.team,
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
    // Main Section
    createSectionField({
      name: 'mainSection',
      label: 'Main Section',
      fields: [baseFields.content.title, baseFields.content.description],
    }),

    // Mission Section
    createSectionField({
      name: 'missionSection',
      label: 'Mission Section',
      fields: [
        {
          ...baseFields.content.label,
          admin: {
            description: 'Mission section label (e.g., "OUR MISSION")',
          },
        },
        baseFields.content.description,
        baseFields.media.image,
      ],
    }),

    // Features Section
    createSectionField({
      name: 'featuresSection',
      label: 'Features Section',
      fields: [
        baseFields.content.title,
        baseFields.content.description,
        createArrayField({
          name: 'features',
          fields: [
            {
              ...baseFields.ui.icon,
              admin: {
                description:
                  'Enter a Lucide icon name (e.g., "FileText", "ArrowRight", "Settings")',
              },
            },
            baseFields.content.title,
            baseFields.content.description,
          ],
          minRows: 1,
          maxRows: 3,
          admin: {
            description: 'Feature items (1-3)',
          },
        }),
      ],
    }),

    // Team Section
    createSectionField({
      name: 'teamSection',
      label: 'Team Section',
      fields: [
        {
          ...baseFields.content.label,
          admin: {
            description: 'Team section label (e.g., "JOIN OUR TEAM")',
          },
        },
        baseFields.content.title,
        baseFields.media.image,
        baseFields.content.description,
      ],
    }),
  ],
  admin: {
    description: 'Modern about section with mission, features, and team sections',
  },
}
