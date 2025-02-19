import type { GroupFieldClientProps } from 'payload'

export type FieldRef = { setValue?: (value: any) => void }

export interface BaseStore<T> {
  fields: Record<keyof T, FieldRef>
  setFieldRef: (name: keyof T, field: FieldRef) => void
  updateFields: (data: Partial<T>) => void
  clearFields: () => void
}

export interface ClientProps extends GroupFieldClientProps {
  onGenerate: () => Promise<void>
}
