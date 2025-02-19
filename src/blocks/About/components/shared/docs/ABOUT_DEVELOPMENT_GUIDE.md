# About Component Development Guide

This guide aims to help developers understand and implement the About component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The About component development process follows these steps:

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
- Media placeholders
- Content sections

### 2.2 Analyze and Atomize Fields

1. Check dynamic parts in TSX code
2. Look for existing atomic fields in `base-field.ts`
3. If needed, add new atomic fields to `base-field.ts`

For example:

```typescript
// src/blocks/About/components/shared/base-field.ts

// 1. Add schema definition
export const aboutSchemas = {
  /** Title schema */
  title: z.string().describe('The about section title'),
  /** Description schema */
  description: z.string().describe('The about section description'),
  /** Media schema */
  media: z.object({
    id: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  /** Stats schema */
  stat: z.object({
    value: z.string(),
    label: z.string(),
  }),
}

// 2. Add field configuration
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'About section title',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'About section description',
    },
  },
  media: {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'About section image',
    },
  },
  stat: {
    name: 'stat',
    type: 'group',
    fields: [
      {
        name: 'value',
        type: 'text',
        required: true,
      },
      {
        name: 'label',
        type: 'text',
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
import { createAboutField, aboutSchemas } from '../shared/base-field'

/**
 * About N field validation and type definitions
 */
export const schemas = {
  title: aboutSchemas.title,
  description: aboutSchemas.description,
  media: aboutSchemas.media,
  stats: z.array(aboutSchemas.stat),
}

/**
 * Complete configuration for About N
 */
export const aboutNFields: GroupField = {
  name: 'about-n',
  interfaceName: 'AboutNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this about component',
  },
  fields: [
    createAboutField({
      includeFields: ['title', 'description', 'media'],
      arrays: [
        {
          name: 'stats',
          fields: [basicFields.stat],
          minRows: 0,
          maxRows: 4,
          admin: {
            description: 'About section statistics (0-4)',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/blocks/About/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { aboutNFields } from './components/AboutN/config'

export const AboutField: Field = {
  name: 'about',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'about-n',
      ],
    },
    {
      ...aboutNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'about-n',
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
   export const aboutNFields: GroupField = {
     name: 'about-n',
     interfaceName: 'AboutNFields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { AboutNFields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type AboutNData = NonNullable<NonNullable<Page['about']>['aboutN']>
   ```

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import type { AboutNFields } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export default function AboutN({ title, description, media, stats }: AboutNFields) {
  return (
    // Implement about section logic
  )
}
```

## 3. Configuration File Guide

### 3.1 createAboutField Function

`createAboutField` function supports:

1. **Basic Field Configuration**

   ```typescript
   createAboutField({
     includeFields: ['title', 'description', 'media'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createAboutField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'stats',
         fields: [basicFields.stat],
         minRows: 0,
         maxRows: 4,
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createAboutField({
     includeFields: ['title'],
     groups: [
       {
         name: 'content',
         fields: ['description', 'media'],
         admin: {
           description: 'Main content section',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**

   ```typescript
   createAboutField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'stats',
         fields: [basicFields.stat],
         minRows: 0,
         maxRows: 4,
       },
     ],
     groups: [
       {
         name: 'content',
         fields: ['description', 'media'],
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

### 4.2 Media Handling Issues

Issue: Images not displaying correctly
Solution:

1. Verify Media component usage
2. Check image dimensions and formats
3. Ensure proper responsive image handling
4. Verify media upload configuration

### 4.3 Conditional Rendering Issues

Issue: About component not showing in admin interface
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
- [ ] Media handling is implemented correctly
- [ ] Responsive design is implemented
- [ ] Code comments are complete
- [ ] Project code standards are followed
- [ ] `interfaceName` follows naming convention and is unique
- [ ] Field references are correct and exist

## 6. Best Practices

1. Use semantic HTML structure
2. Implement responsive images with proper sizing
3. Follow accessibility guidelines
4. Keep content sections modular
5. Use existing atomic fields when possible
6. Add meaningful alt text for images
7. Optimize media assets
8. Implement proper loading states
9. Use appropriate typography scale
10. Follow spacing and layout guidelines

## Conclusion

Following this guide will help you create high-quality About components. If you have questions, refer to existing About component implementations or consult team members.
