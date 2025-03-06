'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero6Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero6Fields> = ['title', 'subtitle', 'image', 'links']
const useHero6Store = createStore<Hero6Fields>(FIELDS)

function Hero6Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero6Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const linksField = useField<Hero6Fields['links']>({ path: getFieldPath(props, 'links') })
  const secondaryImageField = useField<string>({ path: getFieldPath(props, 'secondaryImage') })
  const partnersField = useField<Hero6Fields['partners']>({ path: getFieldPath(props, 'partners') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      image: imageField,
      secondaryImage: secondaryImageField,
      partners: partnersField,
      links: linksField,
    }),
    [titleField, subtitleField, imageField, secondaryImageField, partnersField, linksField],
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

export default Hero6Client
