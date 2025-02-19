'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA3Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof CTA3Fields> = ['title', 'subtitle', 'buttons', 'list']
const useCTA3Store = createStore<CTA3Fields>(FIELDS)

function CTA3Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA3Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const buttonsField = useField<CTA3Fields['buttons']>({ path: getFieldPath(props, 'buttons') })
  const listField = useField<CTA3Fields['list']>({ path: getFieldPath(props, 'list') })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      buttons: buttonsField,
      list: listField,
    }),
    [titleField, subtitleField, buttonsField, listField],
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

export default CTA3Client
