'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useState } from 'react'
import type { CTA15Fields } from '@/payload-types'
import { getCTA15Content } from './ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA15Fields]: ReturnType<typeof useField<CTA15Fields[K]>>
}

export const CTA15Client: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    heading: useField<string>({ path: getFieldPath(props, 'heading') }),
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    image: useField<string>({ path: getFieldPath(props, 'image') }),
    links: useField<CTA15Fields['links']>({ path: getFieldPath(props, 'links') }),
  }

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Clear all existing values first
      fields.heading?.setValue?.('')
      fields.title?.setValue?.('')
      fields.subtitle?.setValue?.('')
      fields.links?.setValue?.([])

      // Generate data using specialized CTA15 AI generator
      const generatedData = await getCTA15Content()

      // Set new values after generation
      fields.heading?.setValue?.(generatedData.heading ?? '')
      fields.title?.setValue?.(generatedData.title ?? '')
      fields.subtitle?.setValue?.(generatedData.subtitle ?? '')
      fields.links?.setValue?.(generatedData.links ?? [])
    } catch (error) {
      console.error('Error generating CTA15 content:', error)
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

export default CTA15Client
