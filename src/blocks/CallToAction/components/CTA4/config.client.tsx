'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useState } from 'react'
import type { CTA4Fields } from '@/payload-types'
import { getCTA4Content } from './ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA4Fields]: ReturnType<typeof useField<CTA4Fields[K]>>
}

export const TestField: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    links: useField<CTA4Fields['links']>({ path: getFieldPath(props, 'links') }),
    lists: useField<CTA4Fields['lists']>({ path: getFieldPath(props, 'lists') }),
  }

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Clear all existing values first
      fields.title?.setValue?.('')
      fields.subtitle?.setValue?.('')
      fields.links?.setValue?.([])
      fields.lists?.setValue?.([])

      // Generate data using specialized CTA4 AI generator
      const generatedData = await getCTA4Content()

      // Set new values after generation
      fields.title?.setValue?.(generatedData.title ?? '')
      fields.subtitle?.setValue?.(generatedData.subtitle ?? '')
      fields.links?.setValue?.(generatedData.links ?? [])
      fields.lists?.setValue?.(generatedData.lists ?? [])
    } catch (error) {
      console.error('Error generating CTA4 content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleClick} disabled={isLoading} icon={<SparklesIcon />}>
        {isLoading ? 'Generating...' : 'AI Generate'}
      </Button>
      <GroupField {...props} />
    </div>
  )
}

export default TestField
