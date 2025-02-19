import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'

// Main Section Fields
const mainTitle: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'The main heading for the section',
  },
}

const mainDescription: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'The main description text',
  },
}

// Mission Section Fields
const missionLabel: Field = {
  name: 'label',
  type: 'text',
  required: true,
  defaultValue: 'OUR MISSION',
  admin: {
    description: 'Mission section label (e.g., "OUR MISSION")',
  },
}

const missionDescription: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'Mission statement text',
  },
}

const missionImage: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: 'Mission section image',
  },
}
// Features Section Fields
const featuresTitle: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'Features section heading',
  },
}

const featuresDescription: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'Features section description',
  },
}

const featureIcon = icon({
  name: 'icon',
  label: 'Icon',
})

const featureTitle: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'Feature title',
  },
}

const featureDescription: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'Feature description',
  },
}

const features: Field = {
  name: 'features',
  type: 'array',
  minRows: 1,
  maxRows: 3,
  admin: {
    description: 'Feature items (1-3)',
  },
  fields: [featureIcon, featureTitle, featureDescription],
}

// Team Section Fields
const teamLabel: Field = {
  name: 'label',
  type: 'text',
  required: true,
  defaultValue: 'JOIN OUR TEAM',
  admin: {
    description: 'Team section label (e.g., "JOIN OUR TEAM")',
  },
}

const teamTitle: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'Team section heading',
  },
}

const teamDescription: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'Team section description',
  },
}

const teamImage: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: 'Team section image',
  },
}

// Section Groups
const mainSection: GroupField = {
  name: 'mainSection',
  label: 'Main Section',
  type: 'group',
  fields: [mainTitle, mainDescription],
}

const missionSection: GroupField = {
  name: 'missionSection',
  label: 'Mission Section',
  type: 'group',
  fields: [missionLabel, missionDescription, missionImage],
}

const featuresSection: GroupField = {
  name: 'featuresSection',
  label: 'Features Section',
  type: 'group',
  fields: [featuresTitle, featuresDescription, features],
}

const teamSection: GroupField = {
  name: 'teamSection',
  label: 'Team Section',
  type: 'group',
  fields: [teamLabel, teamTitle, teamImage, teamDescription],
}

/**
 * Complete configuration for About1
 * Features:
 * - Modern about section with mission, features, and team sections
 * - Responsive layout with grid and flex components
 * - Dynamic feature icons and media support
 */
export const about1Fields: GroupField = {
  name: 'about-1',
  interfaceName: 'About1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern about section with mission, features, and team sections',
  },
  fields: [mainSection, missionSection, featuresSection, teamSection],
}
