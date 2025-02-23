import { create, type StoreApi, type UseBoundStore } from 'zustand'
import { updateFieldValue } from '../utils'
import type { BaseStore, FieldRef } from './types'

export function createStore<T extends Record<string, any>>(
  fieldNames: Array<keyof T>,
): UseBoundStore<StoreApi<BaseStore<T>>> {
  // Create initial field refs with empty references
  const fieldRefs = fieldNames.reduce(
    (acc, name) => ({
      ...acc,
      [name]: { setValue: undefined },
    }),
    {} as Record<keyof T, FieldRef>,
  )

  return create<BaseStore<T>>((set) => ({
    fields: fieldRefs,
    setFieldRef: (name, field) => {
      // Only update if the field reference has changed
      if (fieldRefs[name] !== field) {
        fieldRefs[name] = field
        set({ fields: fieldRefs })
      }
    },
    updateFields: (data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          const field = fieldRefs[key as keyof T]
          if (field?.setValue) {
            updateFieldValue(field, value)
          }
        }
      })
    },
    clearFields: () => {
      Object.values(fieldRefs).forEach((field) => {
        updateFieldValue(field, null)
      })
    },
  }))
}
