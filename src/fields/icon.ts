import { Field } from 'payload'

interface IconSelectFieldOptions {
  name?: string
  label?: string
}

export const icon = ({ name = 'iconType', label = 'Icon' }: IconSelectFieldOptions): Field => ({
  name,
  type: 'text',
  label,
  admin: {
    components: {
      Field: '@/components/IconSelect/',
    },
  },
})
