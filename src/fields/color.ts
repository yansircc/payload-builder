import type { TextField } from 'payload'

export const color = (overrides?: Omit<TextField, 'type'>): TextField => {
  const { name = 'color', label = 'Color', admin, ...rest } = overrides ?? {}

  return {
    type: 'text',
    name,
    label,
    admin: {
      ...admin,
      components: {
        Field: '@/components/ColorPicker/',
      },
    },
    ...rest,
  } as TextField
}
