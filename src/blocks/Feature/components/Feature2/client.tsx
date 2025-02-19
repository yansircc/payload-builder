'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature2Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof Feature2Fields> = ['title', 'description', 'icon', 'image', 'buttonGroup']
const useFeature2Store = createStore<Feature2Fields>(FIELDS)

function Feature2Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature2Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const buttonGroupField = useField<Feature2Fields['buttonGroup']>({
    path: getFieldPath(props, 'buttonGroup'),
  })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      description: descriptionField,
      icon: iconField,
      image: imageField,
      buttonGroup: buttonGroupField,
    }),
    [titleField, descriptionField, iconField, imageField, buttonGroupField],
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

export default Feature2Client
