import type { Field, StaticLabel } from 'payload'
import { createFieldLabel } from '.'
import type { Translation } from './types'

/**
 * Convert StaticLabel or string to Translation type
 */
function toTranslation(label: StaticLabel | string): Translation {
  if (typeof label === 'string') {
    return { en: label, zh: label }
  }
  // Handle StaticLabel type
  return {
    en: label.en || '',
    zh: label.zh || '',
  }
}

/**
 * 1. Collection Config
 */
export const PostsConfig = {
  // Collection Label
  label: createFieldLabel('posts', undefined, 'Posts'),

  // Collection Fields
  fields: [
    // Basic Field
    {
      name: 'title',
      type: 'text',
      required: true,
      label: createFieldLabel('title'),
    },

    // Collection Specific Field
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: createFieldLabel('heroImage', 'posts', 'Hero Image'),
    },

    // Field with Default Value
    {
      name: 'status',
      type: 'select',
      label: createFieldLabel('status', 'posts', 'Status'),
      defaultValue: 'draft',
      options: [
        { label: createFieldLabel('draft', 'posts', 'Draft'), value: 'draft' },
        { label: createFieldLabel('published', 'posts', 'Published'), value: 'published' },
      ],
    },
  ],
} satisfies { label: unknown; fields: Partial<Field>[] }

/**
 * 2. Table Column Config
 */
export const tableColumns = [
  {
    header: createFieldLabel('title'),
    accessorKey: 'title',
  },
  {
    header: createFieldLabel('status', 'posts'),
    accessorKey: 'status',
  },
  {
    header: createFieldLabel('publishedAt', 'posts'),
    accessorKey: 'publishedAt',
  },
]

/**
 * 3. Validation Messages
 */
export const validationMessages = {
  required: (fieldName: string, collectionName?: string) => {
    const label = toTranslation(createFieldLabel(fieldName, collectionName))
    return {
      en: `${label.en} is required`,
      zh: `${label.zh}是必填项`,
    }
  },
  invalid: (fieldName: string, collectionName?: string) => {
    const label = toTranslation(createFieldLabel(fieldName, collectionName))
    return {
      en: `${label.en} is invalid`,
      zh: `${label.zh}格式不正确`,
    }
  },
}

/**
 * 4. Filter Config
 */
export const filterConfig = [
  {
    id: 'status',
    label: createFieldLabel('status', 'posts'),
    options: [
      { label: createFieldLabel('draft', 'posts'), value: 'draft' },
      { label: createFieldLabel('published', 'posts'), value: 'published' },
    ],
  },
  {
    id: 'category',
    label: createFieldLabel('category'),
    options: [
      { label: createFieldLabel('news', 'categories'), value: 'news' },
      { label: createFieldLabel('blog', 'categories'), value: 'blog' },
    ],
  },
]

/**
 * 5. Admin UI Components
 */
export const AdminUIConfig = {
  // Navigation Menu
  navigation: {
    posts: {
      label: createFieldLabel('posts', undefined, 'Posts'),
      group: createFieldLabel('content', undefined, 'Content'),
    },
    media: {
      label: createFieldLabel('media', undefined, 'Media'),
      group: createFieldLabel('content', undefined, 'Content'),
    },
  },

  // Actions
  actions: {
    create: createFieldLabel('create', undefined, 'Create'),
    edit: createFieldLabel('edit', undefined, 'Edit'),
    delete: createFieldLabel('delete', undefined, 'Delete'),
  },

  // Form Validation
  validation: {
    messages: {
      required: (fieldName: string) => validationMessages.required(fieldName),
      email: () => ({
        en: 'Please enter a valid email address',
        zh: '请输入有效的邮箱地址',
      }),
    },
  },

  // Search Placeholder
  searchPlaceholder: createFieldLabel('searchPlaceholder', undefined, 'Search...'),

  // Bulk Actions
  bulkActions: {
    delete: {
      label: createFieldLabel('bulkDelete', undefined, 'Delete Selected'),
      confirmMessage: {
        en: 'Are you sure you want to delete the selected items?',
        zh: '确定要删除选中的项目吗？',
      },
    },
  },
}

/**
 * 6. API Response Messages
 */
export const apiMessages = {
  success: {
    create: (collectionName: string) => {
      const label = toTranslation(createFieldLabel(collectionName))
      return {
        en: `${label.en} created successfully`,
        zh: `${label.zh}创建成功`,
      }
    },
    update: (collectionName: string) => {
      const label = toTranslation(createFieldLabel(collectionName))
      return {
        en: `${label.en} updated successfully`,
        zh: `${label.zh}更新成功`,
      }
    },
    delete: (collectionName: string) => {
      const label = toTranslation(createFieldLabel(collectionName))
      return {
        en: `${label.en} deleted successfully`,
        zh: `${label.zh}删除成功`,
      }
    },
  },
  error: {
    notFound: (collectionName: string) => {
      const label = toTranslation(createFieldLabel(collectionName))
      return {
        en: `${label.en} not found`,
        zh: `未找到${label.zh}`,
      }
    },
    unauthorized: {
      en: 'Unauthorized access',
      zh: '未授权访问',
    },
  },
}

/**
 * 7. Dynamic Form Fields
 */
export const dynamicFormFields = {
  // Basic Info Form
  basicInfo: [
    {
      name: 'title',
      label: createFieldLabel('title'),
      required: true,
    },
    {
      name: 'description',
      label: createFieldLabel('description'),
      type: 'textarea',
    },
  ],

  // SEO Info Form
  seoInfo: [
    {
      name: 'metaTitle',
      label: createFieldLabel('metaTitle', undefined, 'Meta Title'),
      required: true,
    },
    {
      name: 'metaDescription',
      label: createFieldLabel('metaDescription', undefined, 'Meta Description'),
      type: 'textarea',
    },
  ],
}

/**
 * 8. Advanced Usage
 */
export const advancedUsage = {
  // Conditional Rendered Label
  conditionalLabel: (condition: boolean, fieldName: string) => {
    const baseLabel = toTranslation(createFieldLabel(fieldName))
    return condition
      ? { en: `${baseLabel.en} (Active)`, zh: `${baseLabel.zh} (生效中)` }
      : baseLabel
  },

  // Combine Multiple Translations
  combineTranslations: (parts: Translation[]): Translation => {
    return {
      en: parts.map((p) => p.en).join(' '),
      zh: parts.map((p) => p.zh).join(''),
    }
  },

  // Interpolate Translation with Variables
  interpolateTranslation: (
    translation: Translation,
    variables: Record<string, string>,
  ): Translation => {
    let { en, zh } = translation
    Object.entries(variables).forEach(([key, value]) => {
      en = en.replace(`{${key}}`, value)
      zh = zh.replace(`{${key}}`, value)
    })
    return { en, zh }
  },
}
