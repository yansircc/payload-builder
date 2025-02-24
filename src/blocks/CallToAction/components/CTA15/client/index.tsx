'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { CTA15Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof CTA15Fields> = ['heading', 'title', 'subtitle', 'links', 'image']
const useCTA15Store = createStore<CTA15Fields>(FIELDS)

function CTA15Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useCTA15Store()

  // Initialize fields at the component level
  const headingField = useField<string>({ path: getFieldPath(props, 'heading') })
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const linksField = useField<CTA15Fields['links']>({ path: getFieldPath(props, 'links') })
  const imageField = useField<CTA15Fields['image']>({ path: getFieldPath(props, 'image') })

  const fieldsMap = useMemo(
    () => ({
      heading: headingField,
      title: titleField,
      subtitle: subtitleField,
      links: linksField,
      image: imageField,
    }),
    [headingField, titleField, subtitleField, linksField, imageField],
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

export default CTA15Client
