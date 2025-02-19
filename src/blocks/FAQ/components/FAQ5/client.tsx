'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { FAQ5Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof FAQ5Fields> = ['title', 'subtitle', 'description', 'faqs']
const useFAQ5Store = createStore<FAQ5Fields>(FIELDS)

function FAQ5Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFAQ5Store()

  // Basic fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const faqsField = useField<FAQ5Fields['faqs']>({ path: getFieldPath(props, 'faqs') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      description: descriptionField,
      faqs: faqsField,
    }),
    [titleField, subtitleField, descriptionField, faqsField],
  )

  // Set field references
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

export default FAQ5Client
