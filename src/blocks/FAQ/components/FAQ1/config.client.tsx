'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { FAQ1Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof FAQ1Fields> = ['title', 'faqs']
const useFAQ1Store = createStore<FAQ1Fields>(FIELDS)

function FAQ1Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFAQ1Store()

  // Basic fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const faqsField = useField<FAQ1Fields['faqs']>({ path: getFieldPath(props, 'faqs') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      faqs: faqsField,
    }),
    [titleField, faqsField],
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

export default FAQ1Client
