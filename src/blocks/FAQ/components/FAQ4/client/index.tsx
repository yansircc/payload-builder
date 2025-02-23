'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { FAQ4Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof FAQ4Fields> = ['title', 'subtitle', 'description', 'faqs', 'support']
const SUPPORT_SUBFIELDS = ['title', 'subtitle', 'supportLink'] as const
const useFAQ4Store = createStore<FAQ4Fields>(FIELDS)

function FAQ4Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFAQ4Store()

  // Basic fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const descriptionField = useField<string>({ path: getFieldPath(props, 'description') })
  const faqsField = useField<FAQ4Fields['faqs']>({ path: getFieldPath(props, 'faqs') })

  // Support fields - move hooks to top level
  const supportTitleField = useField<string>({
    path: `${getFieldPath(props, 'support')}.title`,
  })
  const supportSubtitleField = useField<string>({
    path: `${getFieldPath(props, 'support')}.subtitle`,
  })
  const supportLinkField = useField<FAQ4Fields['support']['supportLink']>({
    path: `${getFieldPath(props, 'support')}.supportLink`,
  })

  // Memoize support fields object
  const supportFields = useMemo(
    () => ({
      title: supportTitleField,
      subtitle: supportSubtitleField,
      supportLink: supportLinkField,
    }),
    [supportTitleField, supportSubtitleField, supportLinkField],
  )

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      description: descriptionField,
      faqs: faqsField,
      support: {
        value: {
          title: supportFields.title.value ?? '',
          subtitle: supportFields.subtitle.value ?? '',
          supportLink: supportFields.supportLink.value ?? [],
        },
        setValue: (value: FAQ4Fields['support']) => {
          if (value) {
            SUPPORT_SUBFIELDS.forEach((field) => {
              supportFields[field].setValue(value[field] ?? (field === 'supportLink' ? [] : ''))
            })
          } else {
            SUPPORT_SUBFIELDS.forEach((field) => {
              supportFields[field].setValue(field === 'supportLink' ? [] : '')
            })
          }
        },
      },
    }),
    [titleField, subtitleField, descriptionField, faqsField, supportFields],
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

export default FAQ4Client
