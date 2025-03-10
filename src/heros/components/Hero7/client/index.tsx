'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero7Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero7Fields> = ['title', 'subtitle', 'link', 'rating']
const useHero7Store = createStore<Hero7Fields>(FIELDS)

function Hero7Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero7Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const linkField = useField<Hero7Fields['link']>({ path: getFieldPath(props, 'link') })
  const ratingField = useField<Hero7Fields['rating']>({ path: getFieldPath(props, 'rating') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      link: linkField,
      rating: ratingField,
    }),
    [titleField, subtitleField, linkField, ratingField],
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

export default Hero7Client
