'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA16Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof CTA16Fields> = ['title', 'subtitle', 'icon', 'links', 'image']
const useCTA16Store = createStore<CTA16Fields>(FIELDS)

function CTA16Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA16Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const linksField = useField<CTA16Fields['links']>({ path: getFieldPath(props, 'links') })
  const imageField = useField<CTA16Fields['image']>({ path: getFieldPath(props, 'image') })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      icon: iconField,
      links: linksField,
      image: imageField,
    }),
    [titleField, subtitleField, iconField, linksField, imageField],
  )

  useEffect(() => {
    FIELDS.forEach((field) => {
      setFieldRef(field, fieldsMap[field])
    })
  }, [fieldsMap, setFieldRef])

  const handleGenerate = useCallback(async () => {
    try {
      clearFields()
      const generatedData = await autogen()
      updateFields(generatedData)
    } catch (error) {
      console.error('Error generating FAQ content:', error)
    }
    return Promise.resolve()
  }, [clearFields, updateFields])

  return (
    <div className="space-y-4">
      <GenerateButton onGenerate={handleGenerate} />
      <GroupField {...props} />
    </div>
  )
}

export default CTA16Client
