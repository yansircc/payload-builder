'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero34Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero34Fields> = ['title', 'subtitle', 'image', 'badge', 'links']
const useHero34Store = createStore<Hero34Fields>(FIELDS)

function Hero34Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero34Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const imageField = useField<Hero34Fields['image']>({ path: getFieldPath(props, 'image') })
  const badgeField = useField<Hero34Fields['badge']>({ path: getFieldPath(props, 'badge') })
  const linksField = useField<Hero34Fields['links']>({ path: getFieldPath(props, 'links') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      image: imageField,
      badge: badgeField,
      links: linksField,
    }),
    [titleField, subtitleField, imageField, badgeField, linksField],
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
      console.error('Error generating Hero content:', error)
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

export default Hero34Client
