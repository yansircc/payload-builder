'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero3Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

// List of fields in the Hero3 component
const FIELDS: Array<keyof Hero3Fields> = [
  'title',
  'subtitle',
  'image',
  'rating',
  'reviewCount',
  'avatars',
  'links',
] as const
const useHero3Store = createStore<Hero3Fields>(FIELDS)

/**
 * Client component for Hero3 with AI generation capability
 */
function Hero3Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero3Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const ratingField = useField<number>({ path: getFieldPath(props, 'rating') })
  const reviewCountField = useField<number>({ path: getFieldPath(props, 'reviewCount') })
  const avatarsField = useField<Hero3Fields['avatars']>({ path: getFieldPath(props, 'avatars') })
  const linksField = useField<Hero3Fields['links']>({ path: getFieldPath(props, 'links') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      image: imageField,
      rating: ratingField,
      reviewCount: reviewCountField,
      avatars: avatarsField,
      links: linksField,
    }),
    [
      titleField,
      subtitleField,
      imageField,
      ratingField,
      reviewCountField,
      avatarsField,
      linksField,
    ],
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

export default Hero3Client
