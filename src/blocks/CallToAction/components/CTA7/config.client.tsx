'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect } from 'react'
import type { CTA7Fields } from '@/payload-types'
import { CTAGenerateButton, getFieldPath } from '../shared'
import { autogen } from './autogen'
import { useCTA7Store } from './store'

export function CTA7Client(props: GroupFieldClientProps) {
  // Initialize fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const linksField = useField<CTA7Fields['links']>({ path: getFieldPath(props, 'links') })
  const listsField = useField<CTA7Fields['lists']>({ path: getFieldPath(props, 'lists') })

  // Get store actions
  const { setFieldRef, updateFields, clearFields } = useCTA7Store()

  // Register fields with store
  useEffect(() => {
    setFieldRef('title', titleField)
    setFieldRef('subtitle', subtitleField)
    setFieldRef('links', linksField)
    setFieldRef('lists', listsField)
  }, [titleField, subtitleField, linksField, listsField, setFieldRef])

  // Handle AI generation
  const handleGenerate = useCallback(async () => {
    clearFields()

    const { stream, objectPromise } = await autogen()

    // Process streaming updates
    for await (const partial of stream) {
      updateFields(partial as Partial<CTA7Fields>)
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

export default CTA7Client
