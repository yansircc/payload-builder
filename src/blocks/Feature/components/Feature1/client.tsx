'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature1Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof Feature1Fields> = ['title', 'description', 'icon', 'image', 'buttonGroup']
const useFeature1Store = createStore<Feature1Fields>(FIELDS)

function Feature1Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature1Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const buttonGroupField = useField<Feature1Fields['buttonGroup']>({
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

export default Feature1Client
