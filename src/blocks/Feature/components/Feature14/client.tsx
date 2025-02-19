'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature14Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof Feature14Fields> = ['features']
const useFeature14Store = createStore<Feature14Fields>(FIELDS)

function Feature14Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature14Store()

  // Initialize fields at the component level
  const featuresField = useField<Feature14Fields['features']>({
    path: getFieldPath(props, 'features'),
  })

  const fieldsMap = useMemo(
    () => ({
      features: featuresField,
    }),
    [featuresField],
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

export default Feature14Client
