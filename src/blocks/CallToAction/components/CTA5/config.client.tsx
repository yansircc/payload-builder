'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect } from 'react'
import type { CTA5Fields } from '@/payload-types'
import { CTAGenerateButton, getFieldPath } from '../shared'
import { autogen } from './autogen'
import { useCTA5Store } from './store'

export function CTA5Client(props: GroupFieldClientProps) {
  // Initialize fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const imageField = useField<string>({ path: getFieldPath(props, 'image') })
  const linksField = useField<CTA5Fields['links']>({ path: getFieldPath(props, 'links') })

  // Get store actions
  const { setFieldRef, updateFields, clearFields } = useCTA5Store()

  // Register fields with store
  useEffect(() => {
    setFieldRef('title', titleField)
    setFieldRef('subtitle', subtitleField)
    setFieldRef('image', imageField)
    setFieldRef('links', linksField)
  }, [titleField, subtitleField, imageField, linksField, setFieldRef])

  // Handle AI generation
  const handleGenerate = useCallback(async () => {
    clearFields()

    const { stream, objectPromise } = await autogen()

    // Process streaming updates
    for await (const partial of stream) {
      updateFields(partial as Partial<CTA5Fields>)
    }

    // Set final values
    const finalData = await objectPromise
    updateFields(finalData)
  }, [clearFields, updateFields])

  return (
    <div className="space-y-4">
      <CTAGenerateButton onGenerate={handleGenerate} />
      <GroupField {...props} />
    </div>
  )
}

export default CTA5Client
