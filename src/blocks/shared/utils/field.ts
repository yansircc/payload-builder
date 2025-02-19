import type { GroupFieldClientProps } from 'payload'

/**
 * Get the field path for a Payload CMS field
 * Handles cases where parentPath might be undefined or empty
 */
export function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  const parentPath = props.parentPath ? `${props.parentPath}.` : ''
  const fieldBaseName = props.field.name ? `${props.field.name}.` : ''
  return `${parentPath}${fieldBaseName}${fieldName}`.replace(/\.$/, '')
}

/**
 * Type-safe field update helper
 */
export function updateFieldValue<T>(
  field: { setValue?: (value: T | null) => void },
  value: T | null,
): void {
  if (field?.setValue) {
    field.setValue(value)
  }
}
