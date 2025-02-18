'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useState } from 'react'
import type { CTA10Fields } from '@/payload-types'
import { getCTA10Content } from './ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA10Fields]: ReturnType<typeof useField<CTA10Fields[K]>>
}

export const CTA10Client: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    links: useField<CTA10Fields['links']>({ path: getFieldPath(props, 'links') }),
  }

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Clear all existing values first
      fields.title?.setValue?.('')
      fields.subtitle?.setValue?.('')
      fields.links?.setValue?.([])

      // Generate data using specialized CTA10 AI generator
      const generatedData = await getCTA10Content()

      // Set new values after generation
      fields.title?.setValue?.(generatedData.title ?? '')
      fields.subtitle?.setValue?.(generatedData.subtitle ?? '')
      fields.links?.setValue?.(generatedData.links ?? [])
    } catch (error) {
      console.error('Error generating CTA10 content:', error)
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

export default CTA10Client
