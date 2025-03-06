'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero12Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero12Fields> = [
  'title',
  'subtitle',
  'logo',
  'badge',
  'links',
  'partners',
]
const useHero12Store = createStore<Hero12Fields>(FIELDS)

function Hero12Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero12Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const logoField = useField<string>({ path: getFieldPath(props, 'logo') })
  const badgeField = useField<string>({ path: getFieldPath(props, 'badge') })
  const partnersField = useField<Hero12Fields['partners']>({
    path: getFieldPath(props, 'partners'),
  })
  const linksField = useField<Hero12Fields['links']>({ path: getFieldPath(props, 'links') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      logo: logoField,
      badge: badgeField,
      partners: partnersField,
      links: linksField,
    }),
    [titleField, subtitleField, logoField, badgeField, partnersField, linksField],
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

export default Hero12Client
