'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Hero32Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Hero32Fields> = ['title', 'subtitle', 'link', 'integrations']
const useHero32Store = createStore<Hero32Fields>(FIELDS)

function Hero32Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useHero32Store()

  // Initialize fields at the component level
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const linkField = useField<Hero32Fields['link']>({ path: getFieldPath(props, 'link') })
  const integrationsField = useField<Hero32Fields['integrations']>({
    path: getFieldPath(props, 'integrations'),
  })

  // Memoize fields map
  const fieldsMap = useMemo(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      link: linkField,
      integrations: integrationsField,
    }),
    [titleField, subtitleField, linkField, integrationsField],
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

export default Hero32Client
