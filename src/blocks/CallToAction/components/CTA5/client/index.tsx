'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA5Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof CTA5Fields> = ['title', 'subtitle', 'image', 'links']
const useCTA5Store = createStore<CTA5Fields>(FIELDS)

function CTA5Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA5Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const imageField = useField<CTA5Fields['image']>({ path: getFieldPath(props, 'image') })
  const linksField = useField<CTA5Fields['links']>({ path: getFieldPath(props, 'links') })

  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      image: imageField,
      links: linksField,
    }),
    [titleField, subtitleField, imageField, linksField],
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

export default CTA5Client
