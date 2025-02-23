'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { FAQ3Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof FAQ3Fields> = ['title', 'subtitle', 'faqs', 'support']
const SUPPORT_SUBFIELDS = ['title', 'subtitle', 'supportLink'] as const
const useFAQ3Store = createStore<FAQ3Fields>(FIELDS)

function FAQ3Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFAQ3Store()

  // Basic fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const faqsField = useField<FAQ3Fields['faqs']>({ path: getFieldPath(props, 'faqs') })

  // Support fields - move hooks to top level
  const supportTitleField = useField<string>({
    path: `${getFieldPath(props, 'support')}.title`,
  })
  const supportSubtitleField = useField<string>({
    path: `${getFieldPath(props, 'support')}.subtitle`,
  })
  const supportLinkField = useField<FAQ3Fields['support']['supportLink']>({
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
      faqs: faqsField,
      support: {
        value: {
          title: supportFields.title.value ?? '',
          subtitle: supportFields.subtitle.value ?? '',
          supportLink: supportFields.supportLink.value ?? [],
        },
        setValue: (value: FAQ3Fields['support']) => {
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
    [titleField, subtitleField, faqsField, supportFields],
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

export default FAQ3Client
