'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA1Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof CTA1Fields> = ['title', 'subtitle', 'image', 'icon', 'btn']
const useCTA1Store = createStore<CTA1Fields>(FIELDS)

function CTA1Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA1Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const btnField = useField<CTA1Fields['btn']>({ path: getFieldPath(props, 'btn') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      image: imageField,
      icon: iconField,
      btn: btnField,
    }),
    [titleField, subtitleField, imageField, iconField, btnField],
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

export default CTA1Client
