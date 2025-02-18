'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useState } from 'react'
import type { CTA16Fields } from '@/payload-types'
import { getCTA16Content } from './ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA16Fields]: ReturnType<typeof useField<CTA16Fields[K]>>
}

export const CTA16Client: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    icon: useField<string>({ path: getFieldPath(props, 'icon') }),
    image: useField<string>({ path: getFieldPath(props, 'image') }),
    links: useField<CTA16Fields['links']>({ path: getFieldPath(props, 'links') }),
  }

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Clear all existing values first
      fields.title?.setValue?.('')
      fields.subtitle?.setValue?.('')
      fields.icon?.setValue?.('')
      fields.links?.setValue?.([])

      // Generate data using specialized CTA16 AI generator
      const generatedData = await getCTA16Content()

      // Set new values after generation
      fields.title?.setValue?.(generatedData.title ?? '')
      fields.subtitle?.setValue?.(generatedData.subtitle ?? '')
      fields.icon?.setValue?.(generatedData.icon ?? '')
      fields.links?.setValue?.(generatedData.links ?? [])
    } catch (error) {
      console.error('Error generating CTA16 content:', error)
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

export default CTA16Client
