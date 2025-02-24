'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA7Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof CTA7Fields> = ['title', 'subtitle', 'links', 'lists']
const useCTA7Store = createStore<CTA7Fields>(FIELDS)

function CTA7Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA7Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const linksField = useField<CTA7Fields['links']>({ path: getFieldPath(props, 'links') })
  const listsField = useField<CTA7Fields['lists']>({ path: getFieldPath(props, 'lists') })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      links: linksField,
      lists: listsField,
    }),
    [titleField, subtitleField, linksField, listsField],
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

export default CTA7Client
