# Header Component Development Guide

This guide aims to help developers understand and implement the Header component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Header component development process follows these steps:

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
// src/Header/components/shared/base-field.ts

// 1. Add schema definition
export const headerSchemas = {
  /** Title schema */
  title: z.string().describe('The header section title'),
  /** Navigation schema */
  navigation: z.object({
    label: z.string(),
    link: z.string(),
    type: z.enum(['internal', 'external']),
  }),
}

// 2. Add field configuration
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Header section title',
    },
  },
  navigation: {
    name: 'navigation',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'link',
        type: 'text',
        required: true,
      },
      {
        name: 'type',
        type: 'select',
        options: ['internal', 'external'],
        required: true,
      },
    ],
  },
}
```

### 2.3 Create Configuration File

Create `config.ts` in the component directory:

```typescript
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeaderField, headerSchemas } from '../shared/base-field'

/**
 * Header N field validation and type definitions
 */
export const schemas = {
  title: headerSchemas.title,
  subtitle: headerSchemas.subtitle,
  navigation: z.array(headerSchemas.navigation),
}

/**
 * Complete configuration for Header N
 */
export const headerNFields: GroupField = {
  name: 'header-n',
  interfaceName: 'HeaderNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this header component',
  },
  fields: [
    createHeaderField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        {
          name: 'navigation',
          fields: [basicFields.navigation],
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Header navigation items',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/Header/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { headerNFields } from './components/HeaderN/config'

export const HeaderField: Field = {
  name: 'header',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'header-n',
      ],
    },
    {
      ...headerNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'header-n',
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
   export const header1Fields: GroupField = {
     name: 'header-1',
     interfaceName: 'Header1Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Header1Fields } from '@/payload-types'
   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Header1Data = NonNullable<NonNullable<Page['header']>['header1']>
   ```

   > Tip: Using types generated from `interfaceName` is more direct, reliable, and maintainable than deriving from the `Page` type.

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import type { Header1Fields } from '@/payload-types'
import { CMSLink } from '@/components/Link' // Must use CMSLink for links
import { Media } from '@/components/Media' // Must use Media for images

export default function Header1({ title, subtitle, navigation }: Header1Fields) {
  return (
    // Implement header navigation logic
  )
}
```

## 3. Configuration File Guide

### 3.1 createHeaderField Function

`createHeaderField` function supports:

1. **Basic Field Configuration**

   ```typescript
   createHeaderField({
     includeFields: ['title', 'subtitle', 'navigation'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createHeaderField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'navigation',
         fields: [basicFields.navigation],
         minRows: 1,
         maxRows: 6,
         admin: {
           description: 'Header navigation items (1-6)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createHeaderField({
     includeFields: ['title'],
     groups: [
       {
         name: 'social',
         fields: ['icon', 'link'],
         admin: {
           description: 'Social media section',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**

   ```typescript
   createHeaderField({
     includeFields: ['title', 'subtitle'],
     arrays: [
       {
         name: 'navigation',
         fields: [basicFields.navigation],
         minRows: 1,
         maxRows: 6,
       },
     ],
     groups: [
       {
         name: 'social',
         fields: ['icon', 'link'],
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

Issue: Feature component not showing in admin interface
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

Following this guide will help you create high-quality Header components. If you have questions, refer to existing Header component implementations or consult team members.
