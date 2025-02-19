'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { FAQ6Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof FAQ6Fields> = ['title', 'subtitle', 'description', 'faqs']
const useFAQ6Store = createStore<FAQ6Fields>(FIELDS)

function FAQ6Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFAQ6Store()

  // Basic fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const faqsField = useField<FAQ6Fields['faqs']>({ path: getFieldPath(props, 'faqs') })

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

export default FAQ6Client
