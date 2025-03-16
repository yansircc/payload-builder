'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero115Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero115Fields> = ['title', 'subtitle', 'trustText', 'image', 'links']
const useHero115Store = createStore<Hero115Fields>(FIELDS)

function Hero115Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero115Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const imageField = useField<Hero115Fields['image']>({ path: getFieldPath(props, 'image') })
  const subtitleField = useField<Hero115Fields['subtitle']>({
    path: getFieldPath(props, 'subtitle'),
  })
  const trustTextField = useField<Hero115Fields['trustText']>({
    path: getFieldPath(props, 'trustText'),
  })
  const linksField = useField<Hero115Fields['links']>({ path: getFieldPath(props, 'links') })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      image: imageField,
      subtitle: subtitleField,
      trustText: trustTextField,
      links: linksField,
    }),
    [titleField, imageField, subtitleField, trustTextField, linksField],
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

export default Hero115Client
