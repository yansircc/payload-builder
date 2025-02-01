# Testimonial Component Development Guide

This guide aims to help developers understand and implement the Testimonial component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Testimonial component development process follows these steps:

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
// src/blocks/Testimonial/components/shared/base-field.ts

// 1. Add schema definition
export const testimonialSchemas = {
  /** Author name schema */
  authorName: z.string().describe('The name of the testimonial author'),
  /** Author role schema */
  authorRole: z.string().describe('The role/position of the author'),
  /** Author company schema */
  authorCompany: z.string().describe('The company of the author'),
  /** Author image schema */
  authorImage: z.any().describe('The author profile image'),
  /** Quote schema */
  quote: z.string().describe('The testimonial quote text'),
  /** Rating schema */
  rating: z.number().min(1).max(5).describe('Rating out of 5 stars'),
}

// 2. Add field configuration
const basicFields = {
  authorName: {
    name: 'authorName',
    type: 'text',
    required: true,
    admin: {
      description: 'Name of the testimonial author',
    },
  },
  authorRole: {
    name: 'authorRole',
    type: 'text',
    admin: {
      description: 'Role/position of the author',
    },
  },
  authorCompany: {
    name: 'authorCompany',
    type: 'text',
    admin: {
      description: 'Company of the author',
    },
  },
  authorImage: {
    name: 'authorImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Author profile image',
    },
  },
  quote: {
    name: 'quote',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Testimonial quote text',
    },
  },
  rating: {
    name: 'rating',
    type: 'number',
    min: 1,
    max: 5,
    admin: {
      description: 'Rating out of 5 stars',
    },
  },
}
```

### 2.3 Create Configuration File

Create `config.ts` in the component directory:

> **Important**: Always import types directly from 'payload', not from 'payload/types' or other subdirectories:
>
> ```typescript
> // ✅ Correct
> import { GroupField } from 'payload'
>
> // ❌ Incorrect
> // import { GroupField } from 'payload/types'
> // import { GroupField } from 'payload/dist/fields/config/types'
> ```

```typescript
import { GroupField } from 'payload'
import { z } from 'zod'
import { createTestimonialField, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial N field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorCompany: testimonialSchemas.authorCompany,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
  rating: testimonialSchemas.rating,
}

/**
 * Complete configuration for Testimonial N
 */
export const testimonialNFields: GroupField = {
  name: 'testimonial-n',
  interfaceName: 'TestimonialNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this testimonial component',
  },
  fields: [
    createTestimonialField({
      includeFields: ['quote', 'authorName', 'authorRole', 'authorCompany'],
      arrays: [
        {
          name: 'testimonials',
          fields: [
            basicFields.quote,
            basicFields.authorName,
            basicFields.authorRole,
            basicFields.authorCompany,
            basicFields.authorImage,
            basicFields.rating,
          ],
          minRows: 1,
          maxRows: 10,
          admin: {
            description: 'Testimonial items (1-10)',
          },
        },
      ],
      groups: [
        {
          name: 'settings',
          fields: ['layout', 'columns', 'showRating'],
          admin: {
            description: 'Testimonial display settings',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/blocks/Testimonial/config.ts`:

> **Important**: When adding a new testimonial component:
>
> 1. Do not modify the existing structure of `config.ts`
> 2. Only add your new component by following these steps:
>    - Import your new testimonial fields
>    - Add your testimonial option to the existing options array
>    - Add your testimonial fields with the appropriate condition
> 3. Keep all existing imports and configurations intact

Example of adding a new testimonial component:

```typescript
import { testimonialNFields } from './components/TestimonialN/config' // Add your import

export const TestimonialField: Field = {
  name: 'testimonial',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options ...
        { label: 'Testimonial N', value: 'testimonial-n' }, // Add your option here
      ],
    },
    // ... existing fields ...
    {
      ...testimonialNFields, // Add your fields here
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-n',
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
   export const testimonial6Fields: GroupField = {
     name: 'testimonial-6',
     interfaceName: 'Testimonial6Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Testimonial6Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Testimonial6Data = NonNullable<NonNullable<Page['blocks']>['testimonial6']>
   ```

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import { Media } from '@/components/Media'
import type { Testimonial6Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'
import { StarIcon } from 'lucide-react'

export default function Testimonial6({ testimonial }: Testimonial6Fields) {
  const { testimonials, settings } = testimonial

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container">
        <div
          className="grid gap-8 md:gap-12"
          style={{
            gridTemplateColumns: `repeat(${settings?.columns ?? 3}, 1fr)`,
          }}
        >
          {testimonials?.map((item, index) => (
            <ClientMotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {item.authorImage && (
                <Media
                  resource={item.authorImage}
                  className="mb-4 h-20 w-20 rounded-full object-cover"
                  sizes="80px"
                />
              )}
              {settings?.showRating && item.rating && (
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
              <blockquote className="mb-4 text-lg">{item.quote}</blockquote>
              <div className="mt-auto">
                <div className="font-semibold">{item.authorName}</div>
                {(item.authorRole || item.authorCompany) && (
                  <div className="text-sm text-muted-foreground">
                    {item.authorRole}
                    {item.authorRole && item.authorCompany && ' at '}
                    {item.authorCompany}
                  </div>
                )}
              </div>
            </ClientMotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key points to remember:

- Use `Media` component for author images
- Implement motion animations with `ClientMotionDiv`
- Type your component with generated types
- Follow the responsive design pattern
- Use Tailwind CSS for styling
- Implement rating display when enabled
- Handle optional fields gracefully

### 2.7 Register the New Testimonial

After implementing your testimonial component, register it in `src/blocks/Testimonial/index.ts`:

1. Import your component and config:

```typescript
import Testimonial6Component from './components/Testimonial6/Component'
export { testimonial6Fields } from './components/Testimonial6/config'
```

2. Export your component:

```typescript
export const Testimonial6 = Testimonial6Component
```

3. Add it to the testimonialComponents mapping:

```typescript
export const testimonialComponents: Record<
  NonNullable<Required<TestimonialField>['style']>,
  ComponentType<TestimonialComponentProps<any>>
> = {
  // ... existing components
  'testimonial-6': Testimonial6,
}
```

## 3. Configuration File Guide

### 3.1 createTestimonialField Function

`createTestimonialField` function supports the following configuration patterns:

1. **Basic Field Configuration**

   ```typescript
   createTestimonialField({
     includeFields: ['quote', 'authorName', 'authorRole'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createTestimonialField({
     includeFields: ['quote'],
     arrays: [
       {
         name: 'testimonials',
         fields: [basicFields.quote, basicFields.authorName, basicFields.authorImage],
         minRows: 1,
         maxRows: 10,
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createTestimonialField({
     includeFields: ['quote'],
     groups: [
       {
         name: 'settings',
         fields: ['layout', 'columns', 'showRating'],
         admin: {
           description: 'Testimonial display settings',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**
   ```typescript
   createTestimonialField({
     includeFields: ['quote', 'authorName'],
     arrays: [
       {
         name: 'testimonials',
         fields: [basicFields.quote, basicFields.authorName],
         minRows: 1,
         maxRows: 10,
       },
     ],
     groups: [
       {
         name: 'settings',
         fields: ['layout', 'columns', 'showRating'],
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

Issue: Testimonial component not showing in admin interface
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
- [ ] Rating display is implemented correctly
- [ ] Author information is displayed properly
- [ ] Optional fields are handled gracefully

## 6. Best Practices

1. Field names should be descriptive and consistent
2. Configuration file structure should be clear
3. Component implementation should be type-safe
4. Keep code concise and maintainable
5. Add necessary comments
6. Prioritize using existing atomic fields
7. Organize testimonials and arrays logically
8. Implement responsive layouts
9. Handle rating display consistently
10. Use appropriate image sizes for author photos

## Conclusion

Following this guide will help you create high-quality Testimonial components. If you have any questions, refer to existing Testimonial component implementations or consult team members.
