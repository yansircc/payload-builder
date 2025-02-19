'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature11Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof Feature11Fields> = ['title', 'description', 'buttonGroup', 'features']
const useFeature11Store = createStore<Feature11Fields>(FIELDS)

function Feature11Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature11Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const buttonGroupField = useField<Feature11Fields['buttonGroup']>({
    path: getFieldPath(props, 'buttonGroup'),
  })
  const featuresField = useField<Feature11Fields['features']>({
    path: getFieldPath(props, 'features'),
  })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      description: descriptionField,
      image: imageField,
      buttonGroup: buttonGroupField,
      features: featuresField,
    }),
    [titleField, descriptionField, imageField, buttonGroupField, featuresField],
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

export default Feature11Client
