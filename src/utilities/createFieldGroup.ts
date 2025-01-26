import { ArrayField, Field, GroupField, LabelFunction, StaticLabel } from 'payload'

export interface ArrayConfig {
  name: string
  fields: Field[]
  minRows?: number
  maxRows?: number
  admin?: ArrayField['admin']
  label?: false | StaticLabel | LabelFunction
}

export interface GroupConfig {
  name: string
  fields: string[]
  arrays?: ArrayConfig[]
  admin?: GroupField['admin']
  label?: false | StaticLabel | LabelFunction
}

export interface FieldGroupOptions<T extends Record<string, Field>> {
  name: string
  fields: T
  includeFields?: Array<keyof T>
  arrays?: ArrayConfig[]
  groups?: GroupConfig[]
  label?: false | StaticLabel | LabelFunction
  admin?: GroupField['admin']
}

/**
 * Create array field configuration with proper typing
 */
function createArrayField(config: ArrayConfig): ArrayField {
  const { name, fields, minRows, maxRows, admin, label = false } = config

  return {
    name,
    type: 'array' as const,
    label,
    minRows,
    maxRows,
    admin,
    fields,
  }
}

/**
 * Create group field configuration with proper typing
 */
function createGroupField<T extends Record<string, Field>>(
  fields: T,
  config: GroupConfig,
): GroupField {
  const { name, fields: groupFields, arrays = [], admin, label = false } = config

  return {
    name,
    type: 'group' as const,
    label,
    admin,
    fields: [
      ...Object.entries(fields)
        .filter(([key]) => groupFields.includes(key))
        .map(([, value]) => value),
      ...arrays.map(createArrayField),
    ],
  }
}

/**
 * Create a field group with a more intuitive structure
 * @param options - Field group configuration options
 * @returns GroupField configuration
 *
 * @example
 * ```typescript
 * createFieldGroup({
 *   name: 'hero',
 *   fields: heroFields,
 *   includeFields: ['title', 'subtitle'],
 *   // Arrays at root level
 *   arrays: [
 *     {
 *       name: 'links',
 *       fields: [basicFields.link],
 *       minRows: 2,
 *     }
 *   ],
 *   // Grouped fields with their own arrays
 *   groups: [{
 *     name: 'rating',
 *     fields: ['rate', 'count'],
 *     arrays: [{
 *       name: 'avatars',
 *       fields: [ratingFields.avatar],
 *       minRows: 3,
 *     }]
 *   }]
 * })
 * ```
 */
export function createFieldGroup<T extends Record<string, Field>>(
  options: FieldGroupOptions<T>,
): GroupField {
  const { name, fields, includeFields, arrays = [], groups = [], label = false, admin } = options

  // Get base fields
  const fieldEntries = Object.entries(fields)
    .filter(([key]) => !includeFields || includeFields.includes(key as keyof T))
    .map(([, value]) => value)

  // Create array fields
  const arrayFields = arrays.map(createArrayField)

  // Create group fields with their arrays
  const groupFields = groups.map((group) => createGroupField(fields, group))

  return {
    name,
    type: 'group' as const,
    label,
    admin,
    fields: [...fieldEntries, ...arrayFields, ...groupFields],
  }
}
