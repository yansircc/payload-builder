# Gallery Component Development Guide

This guide aims to help developers understand and implement the Gallery component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Gallery component development process follows these steps:

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
// src/blocks/Gallery/components/shared/base-field.ts

// 1. Add schema definition
export const gallerySchemas = {
  /** Title schema */
  title: z.string().describe('The main title text'),
  /** Subtitle schema */
  subtitle: z.string().describe('The subtitle text'),
  /** Description schema */
  description: z.string().describe('The description text'),
  /** Image schema */
  image: z.any().describe('The gallery image'),
  /** Images array schema */
  images: z.array(z.any()).describe('Array of gallery images'),
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
  subtitle: {
    name: 'subtitle',
    type: 'text',
    admin: {
      description: 'Subtitle text',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    admin: {
      description: 'Description text',
    },
  },
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Gallery image',
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
import { createGalleryField, gallerySchemas } from '../shared/base-field'

/**
 * Gallery N field validation and type definitions
 */
export const schemas = {
  title: gallerySchemas.title,
  subtitle: gallerySchemas.subtitle,
  description: gallerySchemas.description,
  images: gallerySchemas.images,
}

/**
 * Complete configuration for Gallery N
 */
export const galleryNFields: GroupField = {
  name: 'gallery-n',
  interfaceName: 'GalleryNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this gallery component',
  },
  fields: [
    createGalleryField({
      includeFields: ['title', 'subtitle', 'description'],
      arrays: [
        {
          name: 'images',
          fields: [basicFields.image],
          minRows: 1,
          maxRows: 12,
          admin: {
            description: 'Gallery images (1-12)',
          },
        },
      ],
      groups: [
        {
          name: 'settings',
          fields: ['columns', 'gap', 'aspectRatio'],
          admin: {
            description: 'Gallery display settings',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/blocks/Gallery/config.ts`:

> **Important**: When adding a new gallery component:
>
> 1. Do not modify the existing structure of `config.ts`
> 2. Only add your new component by following these steps:
>    - Import your new gallery fields
>    - Add your gallery option to the existing options array
>    - Add your gallery fields with the appropriate condition
> 3. Keep all existing imports and configurations intact

Example of adding a new gallery component:

```typescript
import { galleryNFields } from './components/GalleryN/config' // Add your import

export const GalleryField: Field = {
  name: 'gallery',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options ...
        { label: 'Gallery N', value: 'gallery-n' }, // Add your option here
      ],
    },
    // ... existing fields ...
    {
      ...galleryNFields, // Add your fields here
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-n',
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
   export const gallery6Fields: GroupField = {
     name: 'gallery-6',
     interfaceName: 'Gallery6Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Gallery6Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Gallery6Data = NonNullable<NonNullable<Page['blocks']>['gallery6']>
   ```

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import { Media } from '@/components/Media'
import type { Gallery6Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Gallery6({ gallery }: Gallery6Fields) {
  const { title, subtitle, description, images, settings } = gallery

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          {title && <h2 className="mb-4">{title}</h2>}
          {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          )}
        </ClientMotionDiv>

        <div
          className="grid gap-4 md:gap-6"
          style={{
            gridTemplateColumns: `repeat(${settings?.columns ?? 3}, 1fr)`,
          }}
        >
          {images?.map((image, index) => (
            <ClientMotionDiv
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Media
                resource={image}
                className="aspect-square w-full object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </ClientMotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key points to remember:

- Use `Media` component for images
- Implement motion animations with `ClientMotionDiv`
- Type your component with generated types
- Follow the responsive design pattern
- Use Tailwind CSS for styling

### 2.7 Register the New Gallery

After implementing your gallery component, register it in `src/blocks/Gallery/index.ts`:

1. Import your component and config:

```typescript
import Gallery6Component from './components/Gallery6/Component'
export { gallery6Fields } from './components/Gallery6/config'
```

2. Export your component:

```typescript
export const Gallery6 = Gallery6Component
```

3. Add it to the galleryComponents mapping:

```typescript
export const galleryComponents: Record<
  NonNullable<Required<GalleryField>['style']>,
  ComponentType<GalleryComponentProps<any>>
> = {
  // ... existing components
  'gallery-6': Gallery6,
}
```

## 3. Configuration File Guide

### 3.1 createGalleryField Function

`createGalleryField` function supports the following configuration patterns:

1. **Basic Field Configuration**

   ```typescript
   createGalleryField({
     includeFields: ['title', 'subtitle', 'description'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createGalleryField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'images',
         fields: [basicFields.image],
         minRows: 1,
         maxRows: 12,
         admin: {
           description: 'Gallery images (1-12)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createGalleryField({
     includeFields: ['title'],
     groups: [
       {
         name: 'settings',
         fields: ['columns', 'gap', 'aspectRatio'],
         admin: {
           description: 'Gallery display settings',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**
   ```typescript
   createGalleryField({
     includeFields: ['title', 'subtitle', 'description'],
     arrays: [
       {
         name: 'images',
         fields: [basicFields.image],
         minRows: 1,
         maxRows: 12,
       },
     ],
     groups: [
       {
         name: 'settings',
         fields: ['columns', 'gap', 'aspectRatio'],
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

Issue: Gallery component not showing in admin interface
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
8. Consider image optimization and lazy loading
9. Implement responsive grid layouts
10. Use appropriate image aspect ratios

## Conclusion

Following this guide will help you create high-quality Gallery components. If you have any questions, refer to existing Gallery component implementations or consult team members.
