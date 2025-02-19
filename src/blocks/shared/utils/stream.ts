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
