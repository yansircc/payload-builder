'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero45Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero45Fields> = ['title', 'image', 'badge', 'features']
const useHero45Store = createStore<Hero45Fields>(FIELDS)

function Hero45Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero45Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const imageField = useField<Hero45Fields['image']>({ path: getFieldPath(props, 'image') })
  const badgeField = useField<Hero45Fields['badge']>({ path: getFieldPath(props, 'badge') })
  const featuresField = useField<Hero45Fields['features']>({
    path: getFieldPath(props, 'features'),
  })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      image: imageField,
      badge: badgeField,
      features: featuresField,
    }),
    [titleField, imageField, badgeField, featuresField],
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

export default Hero45Client
