# Hero Component Development Guide

This guide aims to help developers understand and implement the Hero component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Hero component development process follows these steps:

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
// src/heros/components/shared/base-field.ts

// 1. Add schema definition
export const heroSchemas = {
  /** Title schema */
  title: z.string().describe('The main title text'),
  /** New field schema */
  newField: z.string().describe('Description of the new field'),
}

// 2. Add field configuration
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Main title text',
    },
  },
  // Add new field config
  newField: {
    name: 'newField',
    type: 'text',
    admin: {
      description: 'Description for admin',
    },
  },
}
```

### 2.3 Create Configuration File

Create `config.ts` in the component directory:

```typescript
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero N field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  // ... other schemas
}

/**
 * Complete configuration for Hero N
 */
export const heroNFields: GroupField = {
  name: 'hero-n',
  interfaceName: 'HeroNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this hero component',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle'], // Basic fields
      arrays: [
        // Array fields
        {
          name: 'links',
          fields: [basicFields.link],
          minRows: 2,
          maxRows: 2,
          admin: {
            description: 'Hero buttons (exactly 2)',
          },
        },
        {
          // Add more array fields
        },
      ],
      groups: [
        // Group fields
        {
          name: 'feature',
          fields: ['icon', 'title'],
          admin: {
            description: 'Feature section',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/heros/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { heroNFields } from './components/HeroN/config'

export const HeroField: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'hero-n',
      ],
    },
    {
      ...heroNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-n',
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
   export const hero5Fields: GroupField = {
     name: 'hero-5',
     interfaceName: 'Hero5Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Hero5Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Hero5Data = NonNullable<NonNullable<Page['hero']>['hero5']>
   ```

> Tip: Using types generated from `interfaceName` is more direct, reliable, and maintainable than deriving from the `Page` type.

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import type { Hero5Fields } from '@/payload-types'
import { CMSLink } from '@/components/Link' // Must use CMSLink for links
import { Media } from '@/components/Media' // Must use Media for images

export default function Hero5({ title, subtitle, link, image }: Hero5Fields) {
  return (
    // Implement component logic
  )
}
```

## 3. Configuration File Guide

### 3.1 createHeroField Function

`createHeroField` function supports the following configuration patterns:

1. **Basic Field Configuration**

   ```typescript
   createHeroField({
     includeFields: ['title', 'subtitle', 'link'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createHeroField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'links',
         fields: [basicFields.link],
         minRows: 1,
         maxRows: 2,
         admin: {
           description: 'Hero buttons (1-2)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createHeroField({
     includeFields: ['title'],
     groups: [
       {
         name: 'feature',
         fields: ['icon', 'title'],
         admin: {
           description: 'Feature section',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**
   ```typescript
   createHeroField({
     includeFields: ['title', 'subtitle', 'badge'],
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
         name: 'feature',
         fields: ['icon', 'title'],
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

Issue: Hero component not showing in admin interface
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

Following this guide will help you create high-quality Hero components. If you have any questions, refer to existing Hero component implementations or consult team members.
