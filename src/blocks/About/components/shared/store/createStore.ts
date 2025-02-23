import { create, type StoreApi, type UseBoundStore } from 'zustand'
import { updateFieldValue } from '../utils'
import type { BaseStore, FieldRef } from './types'

export function createStore<T extends Record<string, any>>(
  fieldNames: Array<keyof T>,
): UseBoundStore<StoreApi<BaseStore<T>>> {
  return create<BaseStore<T>>((set, get) => ({
    fields: fieldNames.reduce(
      (acc, name) => ({
        ...acc,
        [name]: {},
      }),
      {} as Record<keyof T, FieldRef>,
    ),
    setFieldRef: (name, field) =>
      set((state) => ({
        fields: {
          ...state.fields,
          [name]: field,
        },
      })),
    updateFields: (data) => {
      const { fields } = get()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          updateFieldValue(fields[key as keyof T], value)
        }
      })
    },
    clearFields: () => {
      const { fields } = get()
      Object.values(fields).forEach((field) => {
        updateFieldValue(field, null)
      })
    },
  }))
}
