'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA17Fields } from '@/payload-types'
import { autogen } from './autogen'

const FIELDS: Array<keyof CTA17Fields> = ['title', 'subtitle', 'links']
const useCTA17Store = createStore<CTA17Fields>(FIELDS)

function CTA17Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA17Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const linksField = useField<CTA17Fields['links']>({ path: getFieldPath(props, 'links') })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      links: linksField,
    }),
    [titleField, subtitleField, linksField],
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

export default CTA17Client
