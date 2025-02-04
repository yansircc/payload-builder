# Logos Component Development Guide

This guide aims to help developers understand and implement the Logos component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The Logos component development process follows these steps:

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
- Logos grid or list structure

### 2.2 Analyze and Atomize Fields

1. Check dynamic parts in TSX code
2. Look for existing atomic fields in `base-field.ts`
3. If needed, add new atomic fields to `base-field.ts`

For example:

```typescript
// src/blocks/Logos/components/shared/base-field.ts

// 1. Add schema definition
export const logosSchemas = {
  /** Title schema */
  title: z.string().describe('The main title text'),
  /** Subtitle schema */
  subtitle: z.string().describe('The subtitle text'),
  /** Description schema */
  description: z.string().describe('The description text'),
  /** Logos schema */
  logo: z.any().describe('The logo image'),
  /** Logos array schema */
  logos: z.array(z.any()).describe('Array of logo images'),
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
  logo: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Logo image',
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
import { createLogosField, logosSchemas } from '../shared/base-field'

/**
 * Logos N field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  subtitle: logosSchemas.subtitle,
  description: logosSchemas.description,
  logos: logosSchemas.logos,
}

/**
 * Complete configuration for Logos N
 */
export const logosNFields: GroupField = {
  name: 'logos-n',
  interfaceName: 'LogosNFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this logos component',
  },
  fields: [
    createLogosField({
      includeFields: ['title', 'subtitle', 'description'],
      arrays: [
        {
          name: 'logos',
          fields: [basicFields.logo],
          minRows: 1,
          maxRows: 12,
          admin: {
            description: 'Logo images (1-12)',
          },
        },
      ],
      groups: [
        {
          name: 'settings',
          fields: ['columns', 'gap', 'grayscale'],
          admin: {
            description: 'Logos display settings',
          },
        },
      ],
    }),
  ],
}
```

### 2.4 Update Global Configuration

In `src/blocks/Logos/config.ts`:

> **Important**: When adding a new logos component:
>
> 1. Do not modify the existing structure of `config.ts`
> 2. Only add your new component by following these steps:
>    - Import your new logos fields
>    - Add your logos option to the existing options array
>    - Add your logos fields with the appropriate condition
> 3. Keep all existing imports and configurations intact

Example of adding a new logos component:

```typescript
import { logosNFields } from './components/LogosN/config' // Add your import

export const LogosField: Field = {
  name: 'logos',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options ...
        { label: 'Logos N', value: 'logos-n' }, // Add your option here
      ],
    },
    // ... existing fields ...
    {
      ...logosNFields, // Add your fields here
      admin: {
        condition: (_, siblingData) => siblingData.style === 'logos-n',
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
   export const logos1Fields: GroupField = {
     name: 'logos-1',
     interfaceName: 'Logos1Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { Logos1Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type Logos1Data = NonNullable<NonNullable<Page['blocks']>['logos1']>
   ```

### 2.6 Implement Component Logic

Create `Component.tsx` and implement component logic:

```typescript
import { Media } from '@/components/Media'
import type { Logos1Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Logos1({ logos }: Logos1Fields) {
  const { title, subtitle, description, logos, settings } = logos

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
          className="grid gap-8 md:gap-12"
          style={{
            gridTemplateColumns: `repeat(${settings?.columns ?? 4}, 1fr)`,
          }}
        >
          {logos?.map((logo, index) => (
            <ClientMotionDiv
              key={logo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={settings?.grayscale ? 'grayscale hover:grayscale-0' : ''}
            >
              <Media
                resource={logo}
                className="mx-auto h-12 w-auto object-contain"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
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

- Use `Media` component for logos
- Implement motion animations with `ClientMotionDiv`
- Type your component with generated types
- Follow the responsive design pattern
- Use Tailwind CSS for styling
- Consider grayscale and hover effects for logos

### 2.7 Register the New Logos

After implementing your logos component, register it in `src/blocks/Logos/index.ts`:

1. Import your component and config:

```typescript
import Logos1Component from './components/Logos1/Component'
export { logos1Fields } from './components/Logos1/config'
```

2. Export your component:

```typescript
export const Logos1 = Logos1Component
```

3. Add it to the logosComponents mapping:

```typescript
export const logosComponents: Record<
  NonNullable<Required<LogosField>['style']>,
  ComponentType<LogosComponentProps<any>>
> = {
  // ... existing components
  'logos-1': Logos1,
}
```

## 3. Configuration File Guide

### 3.1 createLogosField Function

`createLogosField` function supports the following configuration patterns:

1. **Basic Field Configuration**

   ```typescript
   createLogosField({
     includeFields: ['title', 'subtitle', 'description'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createLogosField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'logos',
         fields: [basicFields.logo],
         minRows: 1,
         maxRows: 12,
         admin: {
           description: 'Logo images (1-12)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createLogosField({
     includeFields: ['title'],
     groups: [
       {
         name: 'settings',
         fields: ['columns', 'gap', 'grayscale'],
         admin: {
           description: 'Logos display settings',
         },
       },
     ],
   })
   ```

4. **Combined Configuration**
   ```typescript
   createLogosField({
     includeFields: ['title', 'subtitle', 'description'],
     arrays: [
       {
         name: 'logos',
         fields: [basicFields.logo],
         minRows: 1,
         maxRows: 12,
       },
     ],
     groups: [
       {
         name: 'settings',
         fields: ['columns', 'gap', 'grayscale'],
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

Issue: Logos component not showing in admin interface
Solution:

1. Check if style option value is correct
2. Verify condition function
3. Ensure field names match those in `includeFields`

### 4.3 Logos Display Issues

Issue: Logos appear distorted or misaligned
Solution:

1. Check image aspect ratios
2. Verify Media component sizing
3. Ensure proper grid layout settings
4. Check responsive design breakpoints

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
- [ ] Logos display settings are appropriate
- [ ] Grayscale and hover effects work correctly

## 6. Best Practices

1. Field names should be descriptive and consistent
2. Configuration file structure should be clear
3. Component implementation should be type-safe
4. Keep code concise and maintainable
5. Add necessary comments
6. Prioritize using existing atomic fields
7. Organize fields and arrays logically
8. Consider logo image optimization
9. Implement responsive grid layouts
10. Use appropriate logo sizing and spacing
11. Consider grayscale and hover effects for better UX
12. Ensure logos maintain their aspect ratios
13. Implement proper loading states
14. Consider accessibility features

## Conclusion

Following this guide will help you create high-quality Logos components. If you have any questions, refer to existing Logos component implementations or consult team members.
