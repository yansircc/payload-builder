'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature10Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Feature10Fields> = ['title', 'description', 'features']
const useFeature10Store = createStore<Feature10Fields>(FIELDS)

function Feature10Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature10Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const featuresField = useField<Feature10Fields['features']>({
    path: getFieldPath(props, 'features'),
  })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      description: descriptionField,
      features: featuresField,
    }),
    [titleField, descriptionField, featuresField],
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

export default Feature10Client
