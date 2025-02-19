'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { FAQ2Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof FAQ2Fields> = ['title', 'faqs']
const useFAQ2Store = createStore<FAQ2Fields>(FIELDS)

function FAQ2Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFAQ2Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const faqsField = useField<FAQ2Fields['faqs']>({ path: getFieldPath(props, 'faqs') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      faqs: faqsField,
    }),
    [titleField, faqsField],
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

export default FAQ2Client
