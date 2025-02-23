'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature6Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Feature6Fields> = ['title', 'description', 'icon', 'image', 'features']
const useFeature6Store = createStore<Feature6Fields>(FIELDS)

function Feature6Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature6Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const featuresField = useField<Feature6Fields['features']>({
    path: getFieldPath(props, 'features'),
  })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      description: descriptionField,
      icon: iconField,
      image: imageField,
      features: featuresField,
    }),
    [titleField, descriptionField, iconField, imageField, featuresField],
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

export default Feature6Client
