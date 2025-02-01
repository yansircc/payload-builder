# Team Component Development Guide

This guide aims to help developers understand and implement the Team component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Team component development process follows these steps:

1. Get TSX code from design
2. Analyze and atomize fields
3. Create configuration file
4. Update global configuration
5. Generate types
6. Implement component logic

## 2. Detailed Steps

### 2.1 Get TSX Code

Get static TSX code from the design. This code typically includes:

- Layout structure
- Style classnames
- Static content

### 2.2 Analyze and Atomize Fields

1. Check dynamic parts in TSX code
2. Look for existing atomic fields in `base-field.ts`
3. If needed, add new atomic fields to `base-field.ts`

For example:

```typescript
// src/blocks/Team/components/shared/base-field.ts

// 1. Add schema definition
export const teamSchemas = {
  /** Title schema */
  title: z.string().describe('The team title'),
  /** Subtitle schema */
  subtitle: z.string().describe('The team subtitle'),
  /** Description schema */
  description: z.string().describe('The team description'),
  /** Image schema */
  image: z.object({}).describe('Team image'),
  /** Link schema */
  link: z.object({
    type: z.enum(['reference', 'custom']).optional(),
    newTab: z.boolean().optional(),
    reference: z
      .object({
        relationTo: z.enum(['pages', 'posts']),
        value: z.string(),
      })
      .optional(),
    url: z.string().optional(),
    label: z.string(),
    prefixIcon: z.string().optional(),
    suffixIcon: z.string().optional(),
  }),
  /** People schema */
  people: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      description: z.string(),
      avatar: z.string(),
    }),
  ),
}

// 2. Add field configuration
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Team title',
    },
  },
  subtitle: {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: {
      description: 'Team subtitle',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: false,
    admin: {
      description: 'Team description',
    },
  },
}

/**
 * Media fields configuration
 */
const mediaFields = {
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Media',
    },
  },
}

/**
 * People fields for team-based layouts
 */
const peopleFields = {
  name: {
    name: 'name',
    type: 'text',
    required: true,
    admin: {
      description: 'Team member name',
    },
  },
  role: {
    name: 'role',
    type: 'text',
    required: true,
    admin: {
      description: 'Team member role/position',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Team member bio',
    },
  },
  avatar: {
    name: 'avatar',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Team member avatar image',
    },
  },
}
```

### 2.3 Create Configuration File

Create `config.ts` in the component directory:

```typescript
import { GroupField } from 'payload'
import { z } from 'zod'
import { createTeamField, teamSchemas } from '../shared/base-field'

/**
 * Team N field validation and type definitions
 */
export const schemas = {
  title: teamSchemas.title,
  subtitle: teamSchemas.subtitle,
  people: z.object({
    members: z.array(teamSchemas.people),
  }),
}

/**
 * Complete configuration for Team N
 */
export const teamNFields: GroupField = {
  name: 'team-n',
  interfaceName: 'TeamNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this team component',
  },
  fields: [
    createTeamField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        {
          name: 'members',
          fields: [
            ...Object.values(peopleFields),
            {
              name: 'links',
              type: 'array',
              label: 'Social Links',
              admin: {
                description: 'Member social links',
              },
              fields: [
                link({
                  name: 'link',
                  disableLabel: true,
                  overrides: {
                    admin: {
                      description: 'Link',
                    },
                    defaultValue: {
                      appearance: 'link',
                    },
                  },
                }),
              ],
              minRows: 1,
              maxRows: 3,
            },
          ],
          minRows: 1,
          admin: {
            description: 'Team members',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/blocks/Contact/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { teamNFields } from './components/TeamN/config'

export const TeamField: Field = {
  name: 'team',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'team-n',
      ],
    },
    {
      ...teamNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'team-n',
      },
    },
  ],
}
```

### 2.5 Generate Types

Run the type generation command:

```bash
bun generate:types
```

This command will automatically generate TypeScript type definitions based on our configuration files. Note the following points:

1. **Interface Name Generation Rule**

   ```typescript
   // config.ts
   export const team5Fields: GroupField = {
     name: 'team-5',
     interfaceName: 'Team5Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Team5Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Team5Data = NonNullable<NonNullable<Page['team']>['team5']>
   ```

> Tip: Using types generated from `interfaceName` is more direct, reliable, and maintainable than deriving from the `Page` type.

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import type { TeamNFields } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export default function TeamN({ title, subtitle, members }: TeamNFields) {
  return (
    // Implement team section logic
  )
}
```

## 3. Configuration File Guide

### 3.1 createContactField Function

`createContactField` function supports:

1. **Basic Field Configuration**

   ```typescript
   createTeamField({
     includeFields: ['title', 'subtitle', 'link'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createTeamField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'links',
         fields: [basicFields.link],
         minRows: 1,
         maxRows: 2,
         admin: {
           description: 'Contact links (1-2)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createTeamField({
     includeFields: ['title'],
     groups: [
       {
         name: 'details',
         fields: ['icon', 'description'],
         admin: {
           description: 'Details section',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**

   ```typescript
   createTeamField({
     includeFields: ['title', 'subtitle'],
     arrays: [
       {
         name: 'links',
         fields: [basicFields.link],
         minRows: 1,
         maxRows: 2,
       },
     ],
     groups: [
       {
         name: 'details',
         fields: ['icon', 'description'],
       },
     ],
   })
   ```

## 4. Common Issues

### 4.1 Type Generation Failure

Issue: `bun generate:types` fails
Solution:

1. Check if field names are correct
2. Ensure all referenced fields exist
3. Verify field types are correct
4. Ensure `interfaceName` is unique

### 4.2 Conditional Rendering Issues

Issue: Team component not showing in admin interface
Solution:

1. Check if style option value is correct
2. Verify condition function
3. Ensure field names match those in `includeFields`

## 5. Code Review Checklist

Before submitting code, check the following:

- [ ] Atomic fields are complete and reasonable
- [ ] Configuration file structure is correct
- [ ] Global configuration is updated
- [ ] Types generate successfully
- [ ] Component implementation is complete and type-safe
- [ ] Code comments are complete
- [ ] Project code standards are followed
- [ ] `interfaceName` follows naming convention and is unique
- [ ] Field references are correct and exist

## 6. Best Practices

1. Field names should be descriptive and consistent
2. Configuration file structure should be clear
3. Component implementation should be type-safe
4. Keep code concise and maintainable
5. Add necessary comments
6. Prioritize using existing atomic fields
7. Organize fields and arrays logically

## Conclusion

Following this guide will help you create high-quality Contact components. If you have questions, refer to existing Contact component implementations or consult team members.
