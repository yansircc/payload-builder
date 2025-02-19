# Call to Action (CTA) Component Development Guide

This guide aims to help developers understand and implement the CTA component development process.

## Table of Contents

1. [Development Process Overview](#1-development-process-overview)
2. [Detailed Steps](#2-detailed-steps)
3. [Configuration File Guide](#3-configuration-file-guide)
4. [Common Issues](#4-common-issues)
5. [Code Review Checklist](#5-code-review-checklist)

## 1. Development Process Overview

The CTA component development process follows these steps:

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
// src/blocks/CallToAction/components/shared/base-field.ts

// 1. Add schema definition
export const ctaSchemas = {
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
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA N field validation and type definitions
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  // ... other schemas
}

/**
 * Complete configuration for CTA N
 */
export const ctaNFields: GroupField = {
  name: 'cta-n',
  interfaceName: 'CTANFields',
  label: false,
  type: 'group',
  admin: {
    description: 'Description of this CTA component',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'subtitle'], // Basic fields
      arrays: [
        // Array fields
        {
          name: 'links',
          fields: [basicFields.link],
          minRows: 2,
          maxRows: 2,
          admin: {
            description: 'CTA buttons (exactly 2)',
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

In `src/blocks/CallToAction/config.ts`:

1. Import new component configuration
2. Add to style options
3. Add conditional rendering configuration

```typescript
import { ctaNFields } from './components/CTAN/config'

export const CTAField: Field = {
  name: 'cta',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        // ... existing options
        'cta-n',
      ],
    },
    {
      ...ctaNFields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-n',
      },
    },
  ],
}
```

### 2.5 Update Config File

After creating your CTA component, you need to update the main config file at `src/blocks/CallToAction/config.ts`:

1. Import your new CTA fields at the top of the file:

```typescript
import { ctaNFields } from './components/CTAN/config'
```

2. Add your CTA style to the options array:

```typescript
{
  name: 'style',
  type: 'select',
  options: [
    // ... existing options
    'cta-n', // Add your new CTA style
  ],
}
```

3. Add your CTA fields with the condition:

```typescript
{
  ...ctaNFields,
  admin: {
    condition: (_, siblingData) => siblingData.style === 'cta-n',
  },
}
```

### 2.6 Generate Types

Run the type generation command:

```bash
bun generate:types
```

This command will automatically generate TypeScript type definitions based on our configuration files. Note the following points:

1. **Interface Name Generation Rule**

   ```typescript
   // config.ts
   export const cta5Fields: GroupField = {
     name: 'cta-5',
     interfaceName: 'CTA5Fields', // Interface name defined here
     // ...
   }
   ```

2. **Type Definition Location**

   - Generated types are saved in `@/payload-types`
   - Types can be imported directly using the `interfaceName`

3. **Type Usage Example**

   ```typescript
   // Correct type import
   import type { CTA5Fields } from '@/payload-types'

   // ❌ Not recommended
   // import type { Page } from '@/payload-types'
   // type CTA5Data = NonNullable<NonNullable<Page['cta']>['cta5']>
   ```

> Tip: Using types generated from `interfaceName` is more direct, reliable, and maintainable than deriving from the `Page` type.

### 2.7 Implement Component Logic

Create `Component.tsx` and implement component logic. Here's a reference implementation based on CTA1:

```typescript
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { CTANFields } from '@/payload-types'
import { ClientMotionDiv } from '../shared'

export default function CTAN({ cta }: CTANFields) {
  const { title, subtitle, links, image, badge } = cta

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container relative z-10">
        {/* Implement your CTA layout here */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Content side */}
          <div className="flex flex-col items-start gap-6">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Your CTA content */}
            </ClientMotionDiv>
          </div>

          {/* Media side */}
          <ClientMotionDiv
            className="relative aspect-square lg:aspect-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Your CTA media content */}
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}
```

Key points to remember:

- Use `CMSLink` for links
- Use `Media` component for images
- Implement motion animations with `ClientMotionDiv`
- Type your component with generated types
- Follow the responsive design pattern
- Use Tailwind CSS for styling

### 2.8 Register the New CTA

After implementing your CTA component, you need to register it in `src/blocks/CallToAction/index.ts`:

1. Import your component and config:

```typescript
import CTANComponent from './components/CTAN/Component'

export { ctaNFields } from './components/CTAN/config'
```

2. Export your component:

```typescript
export const CTAN = CTANComponent
```

3. Add it to the ctaComponents mapping:

```typescript
export const ctaComponents: Record<
  NonNullable<Required<CTAField>['style']>,
  ComponentType<CTAComponentProps<any>>
> = {
  // ... existing components
  'cta-n': CTAN,
}
```

This registration process ensures your CTA component is:

- Properly exported
- Available for use in the CMS
- Correctly typed
- Included in the component mapping

## 3. Configuration File Guide

### 3.1 createCTAField Function

`createCTAField` function supports the following configuration patterns:

1. **Basic Field Configuration**

   ```typescript
   createCTAField({
     includeFields: ['title', 'subtitle', 'link'],
   })
   ```

2. **Array Configuration**

   ```typescript
   createCTAField({
     includeFields: ['title'],
     arrays: [
       {
         name: 'links',
         fields: [basicFields.link],
         minRows: 1,
         maxRows: 2,
         admin: {
           description: 'CTA buttons (1-2)',
         },
       },
     ],
   })
   ```

3. **Group Configuration**

   ```typescript
   createCTAField({
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
   createCTAField({
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

Issue: CTA component not showing in admin interface
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

Following this guide will help you create high-quality CTA components. If you have any questions, refer to existing CTA component implementations or consult team members.
