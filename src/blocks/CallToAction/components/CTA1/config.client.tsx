'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect } from 'react'
import type { CTA1Fields } from '@/payload-types'
import { CTAGenerateButton, getFieldPath } from '../shared'
import { autogen } from './autogen'
import { useCTA1Store } from './store'

export function CTA1Client(props: GroupFieldClientProps) {
  // Initialize fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const btnField = useField<CTA1Fields['btn']>({ path: getFieldPath(props, 'btn') })

  // Get store actions
  const { setFieldRef, updateFields, clearFields } = useCTA1Store()

  // Register fields with store
  useEffect(() => {
    setFieldRef('title', titleField)
    setFieldRef('subtitle', subtitleField)
    setFieldRef('icon', iconField)
    setFieldRef('btn', btnField)
  }, [titleField, subtitleField, iconField, btnField, setFieldRef])

  // Handle AI generation
  const handleGenerate = useCallback(async () => {
    clearFields()

    const { stream, objectPromise } = await autogen()

    // Process streaming updates
    for await (const partial of stream) {
      updateFields(partial as Partial<CTA1Fields>)
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

export default CTA1Client
