'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero24Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero24Fields> = [
  'title',
  'subtitle',
  'logo',
  'badge',
  'links',
  'features',
]
const useHero24Store = createStore<Hero24Fields>(FIELDS)

function Hero24Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero24Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const logoField = useField<string>({ path: getFieldPath(props, 'logo') })
  const badgeField = useField<string>({ path: getFieldPath(props, 'badge') })
  const featuresField = useField<Hero24Fields['features']>({
    path: getFieldPath(props, 'features'),
  })
  const linksField = useField<Hero24Fields['links']>({ path: getFieldPath(props, 'links') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      logo: logoField,
      badge: badgeField,
      features: featuresField,
      links: linksField,
    }),
    [titleField, subtitleField, logoField, badgeField, featuresField, linksField],
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

export default Hero24Client
