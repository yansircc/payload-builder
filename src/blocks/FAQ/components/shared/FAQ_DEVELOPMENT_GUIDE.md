# FAQ Component Development Guide

This guide aims to help developers understand and implement the FAQ component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The FAQ component development process follows these steps:

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
// src/blocks/FAQ/components/shared/base-field.ts

// 1. Add schema definition
export const faqSchemas = {
  /** Title schema */
  title: z.string().describe('The faq form title'),
  /** Form field schema */
  formField: z.object({
    label: z.string(),
    placeholder: z.string(),
    required: z.boolean(),
    type: z.enum(['text', 'email', 'textarea']),
  }),
}

// 2. Add field configuration
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'FAQ form title',
    },
  },
  formField: {
    name: 'formField',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'placeholder',
        type: 'text',
        required: true,
      },
      {
        name: 'required',
        type: 'boolean',
        defaultValue: true,
      },
      {
        name: 'type',
        type: 'select',
        options: ['text', 'email', 'textarea'],
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
import { createFAQField, faqSchemas } from '../shared/base-field'

/**
 * FAQ N field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  subtitle: faqSchemas.subtitle,
  formFields: z.array(faqSchemas.formField),
}

/**
 * Complete configuration for FAQ N
 */
export const faqNFields: GroupField = {
  name: 'faq-n',
  interfaceName: 'FAQNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this faq component',
  },
  fields: [
    createFAQField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        // Array fields
        {
          name: 'formFields',
          fields: [basicFields.formField],
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'FAQ form fields',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/blocks/FAQ/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { faqNFields } from './components/FAQN/config'

export const FAQField: Field = {
  name: 'faq',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'faq-n',
      ],
    },
    {
      ...faqNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'faq-n',
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
   export const feature5Fields: GroupField = {
     name: 'feature-5',
     interfaceName: 'Feature5Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Feature5Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Feature5Data = NonNullable<NonNullable<Page['feature']>['feature5']>
   ```

> Tip: Using types generated from `interfaceName` is more direct, reliable, and maintainable than deriving from the `Page` type.

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import type { Feature5Fields } from '@/payload-types'
import { CMSLink } from '@/components/Link' // Must use CMSLink for links
import { Media } from '@/components/Media' // Must use Media for images

export default function FAQN({ title, subtitle, formFields }: FAQNFields) {

  return (
    // Implement faq form logic
  )
}
```

## 3. Configuration File Guide

### 3.1 createFAQField Function

`createFAQField` function supports:

1. **Basic Field Configuration**

   ```typescript
   createFeatureField({
     includeFields: ['title', 'subtitle', 'link'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createFeatureField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'links',
         fields: [basicFields.link],
         minRows: 1,
         maxRows: 2,
         admin: {
           description: 'FAQ links (1-2)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createFeatureField({
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
   createFeatureField({
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

Following this guide will help you create high-quality FAQ components. If you have questions, refer to existing FAQ component implementations or consult team members.
