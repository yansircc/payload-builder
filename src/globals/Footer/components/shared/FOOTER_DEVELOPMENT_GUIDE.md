# Footer Component Development Guide

This guide aims to help developers understand and implement the Footer component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Footer component development process follows these steps:

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
// src/Footer/components/shared/base-field.ts

// 1. Add schema definition
export const footerSchemas = {
  /** Title schema */
  title: z.string().describe('The footer section title'),
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
      description: 'Footer section title',
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
import { createFooterField, footerSchemas } from '../shared/base-field'

/**
 * Footer N field validation and type definitions
 */
export const schemas = {
  title: footerSchemas.title,
  subtitle: footerSchemas.subtitle,
  navigation: z.array(footerSchemas.navigation),
}

/**
 * Complete configuration for Footer N
 */
export const footerNFields: GroupField = {
  name: 'footer-n',
  interfaceName: 'FooterNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this footer component',
  },
  fields: [
    createFooterField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        {
          name: 'navigation',
          fields: [basicFields.navigation],
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Footer navigation items',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/Footer/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { footerNFields } from './components/FooterN/config'

export const FooterField: Field = {
  name: 'footer',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'footer-n',
      ],
    },
    {
      ...footerNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-n',
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
   export const footer1Fields: GroupField = {
     name: 'footer-1',
     interfaceName: 'Footer1Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Footer1Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Footer1Data = NonNullable<NonNullable<Page['footer']>['footer1']>
   ```

> Tip: Using types generated from `interfaceName` is more direct, reliable, and maintainable than deriving from the `Page` type.

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import type { Footer1Fields } from '@/payload-types'
import { CMSLink } from '@/components/Link' // Must use CMSLink for links
import { Media } from '@/components/Media' // Must use Media for images

export default function Footer1({ title, subtitle, navigation }: Footer1Fields) {
  return (
    // Implement footer navigation logic
  )
}
```

## 3. Configuration File Guide

### 3.1 createFooterField Function

`createFooterField` function supports:

1. **Basic Field Configuration**

   ```typescript
   createFooterField({
     includeFields: ['title', 'subtitle', 'navigation'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createFooterField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'navigation',
         fields: [basicFields.navigation],
         minRows: 1,
         maxRows: 6,
         admin: {
           description: 'Footer navigation items (1-6)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createFooterField({
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
   createFooterField({
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

Following this guide will help you create high-quality Footer components. If you have questions, refer to existing Footer component implementations or consult team members.
