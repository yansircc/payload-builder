import type { GroupFieldClientProps } from 'payload'

/**
 * Get the field path for a Payload CMS field
 */
export function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
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

/**
 * Create a streaming update handler for CTA components
 */
export function createStreamUpdateHandler<T>(updateField: (field: keyof T, value: any) => void) {
  return (partial: Partial<T>) => {
    Object.entries(partial).forEach(([key, value]) => {
      if (value !== undefined) {
        updateField(key as keyof T, value)
      }
    })
  }
}

/**
 * Create a field clearer for CTA components
 */
export function createFieldClearer<T>(updateField: (field: keyof T, value: any) => void) {
  return (fields: Record<keyof T, any>) => {
    Object.keys(fields).forEach((key) => {
      updateField(key as keyof T, null)
    })
  }
}
