import { useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useMemo } from 'react'
import { getFieldPath } from '..'

export function useFields<T extends Record<string, any>>(
  props: GroupFieldClientProps,
  fields: Array<keyof T>,
) {
  // Basic fields
  const title = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitle = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const heading = useField<string>({ path: getFieldPath(props, 'heading') })

  // Media fields
  const icon = useField<string>({ path: getFieldPath(props, 'icon') })
  const image = useField<string>({ path: getFieldPath(props, 'image') })

  // Action fields
  const btn = useField<T['btn']>({ path: getFieldPath(props, 'btn') })
  const links = useField<T['links']>({ path: getFieldPath(props, 'links') })
  const buttons = useField<T['buttons']>({ path: getFieldPath(props, 'buttons') })

  // List fields
  const list = useField<T['list']>({ path: getFieldPath(props, 'list') })
  const lists = useField<T['lists']>({ path: getFieldPath(props, 'lists') })

  const fieldMap = useMemo(
    () => ({
      // Basic fields
      title,
      subtitle,
      heading,
      // Media fields
      icon,
      image,
      // Action fields
      btn,
      links,
      buttons,
      // List fields
      list,
      lists,
    }),
    [title, subtitle, heading, icon, image, btn, links, buttons, list, lists],
  )

  return useMemo(
    () =>
      fields.reduce(
        (acc, field) => {
          if (field in fieldMap) {
            acc[field] = fieldMap[field as keyof typeof fieldMap]
          }
          return acc
        },
        {} as Record<keyof T, ReturnType<typeof useField>>,
      ),
    [fields, fieldMap],
  )
}
