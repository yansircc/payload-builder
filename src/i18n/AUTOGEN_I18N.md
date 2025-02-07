# Workflow

1. Create/Modify Fields

   - Use English labels when creating collections, fields, or blocks
   - Ensure labels are clear and descriptive
   - Add JSDoc comments for more detailed field descriptions

2. Generate Type Files

   ```bash
   bun generate:types
   ```

   - This generates payload-types.ts
   - Contains type definitions for all collections and fields
   - The translation script scans this file to collect translatable content

3. Generate Translation Files

   ```bash
   bun generate:translations
   ```

   - This generates the following 5 files:

     ```bash
     src/i18n
     ├── collections.template.ts # Template file for collection translations
     ├── collections.ts         # Actual collection translations (includes translated content)
     ├── common-fields.template.ts # Template file for common field translations
     ├── common-fields.ts       # Actual common field translations (includes translated content)
     └── types.ts              # TypeScript type definitions for translations
     ```

   - Template files (\*.template.ts) contain all English content that needs translation
   - Actual translation files (without .template) store the translated content

4. Translation Workflow

   - Check .template.ts files for new content
   - Add translations in corresponding actual translation files
   - Don't modify .template.ts files directly as they are regenerated each time
   - Existing translations are preserved and won't be overwritten

5. Translation Files Overview

   - common-fields.ts: Stores translations for fields used across multiple collections
   - collections.ts: Stores collection-specific field translations
   - Each translation entry contains en (English) and zh (Chinese) fields

6. Using Translations

   ```typescript
   import { createFieldLabel } from '@/i18n'

   // Basic Collection Config
   export const PostsConfig = {
     label: createFieldLabel('posts', undefined, 'Posts'),
     fields: [
       {
         name: 'title',
         type: 'text',
         required: true,
         label: createFieldLabel('title'),
       },
       {
         name: 'heroImage',
         type: 'upload',
         relationTo: 'media',
         label: createFieldLabel('heroImage', 'posts', 'Hero Image'),
       },
     ],
   }

   // Table Columns
   export const tableColumns = [
     {
       header: createFieldLabel('title'),
       accessorKey: 'title',
     },
   ]

   // Validation Messages
   export const validationMessages = {
     required: (fieldName: string) => {
       const label = toTranslation(createFieldLabel(fieldName))
       return {
         en: `${label.en} is required`,
         zh: `${label.zh}是必填项`,
       }
     },
   }
   ```

# Important Notes

1. Template Files (\*.template.ts)

   - These files are regenerated each time generate:translations is run
   - Do not modify them manually as changes will be overwritten
   - Used to track the latest content requiring translation

2. Actual Translation Files

   - collections.ts and common-fields.ts store the actual translations
   - Existing translations are preserved
   - Only new English content is updated
   - Translations for deleted fields are automatically cleaned up

3. Type Safety

   - types.ts provides complete type definitions
   - All translation operations are type-safe
   - TypeScript type checking ensures translation integrity

4. Best Practices

   - Run generate:translations regularly to sync latest translation needs
   - Provide clear English descriptions when adding new fields
   - Use JSDoc comments for detailed field descriptions
   - Keep translation files clean by removing unused translations
   - Backup files before generation to prevent data loss
   - Use consistent naming conventions for fields
   - Test translations in both languages before deployment
