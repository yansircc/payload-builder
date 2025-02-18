'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useState } from 'react'
import { CTA3Fields } from '@/payload-types'
import { getCTA3Content } from './ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA3Fields]: ReturnType<typeof useField<CTA3Fields[K]>>
}

export const CTA3Client: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    buttons: useField<CTA3Fields['buttons']>({ path: getFieldPath(props, 'buttons') }),
    list: useField<CTA3Fields['list']>({ path: getFieldPath(props, 'list') }),
  }

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Clear all existing values first
      fields.title?.setValue?.('')
      fields.subtitle?.setValue?.('')
      fields.buttons?.setValue?.([])
      fields.list?.setValue?.([])

      // Generate data using specialized CTA3 AI generator
      const generatedData = await getCTA3Content()

      // Set new values after generation
      fields.title?.setValue?.(generatedData.title ?? '')
      fields.subtitle?.setValue?.(generatedData.subtitle ?? '')
      fields.buttons?.setValue?.(generatedData.buttons ?? [])
      fields.list?.setValue?.(generatedData.list ?? [])
    } catch (error) {
      console.error('Error generating CTA3 content:', error)
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

export default CTA3Client
