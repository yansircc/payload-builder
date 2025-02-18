'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useState } from 'react'
import type { CTA1Fields } from '@/payload-types'
import { getCTA1Content } from './ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA1Fields]: ReturnType<typeof useField<CTA1Fields[K]>>
}

export const CTA1Client: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    icon: useField<string>({ path: getFieldPath(props, 'icon') }),
    btn: useField<CTA1Fields['btn']>({ path: getFieldPath(props, 'btn') }),
  }

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Clear all existing values first
      fields.title?.setValue?.('')
      fields.subtitle?.setValue?.('')
      fields.icon?.setValue?.('')
      fields.btn?.setValue?.(null)

      // Generate data using specialized CTA1 AI generator
      const generatedData = await getCTA1Content()

      console.log('Generated Data:', generatedData)

      // Set new values after generation
      fields.title?.setValue?.(generatedData.title ?? '')
      fields.subtitle?.setValue?.(generatedData.subtitle ?? '')
      fields.icon?.setValue?.(generatedData.icon ?? 'ArrowRight')

      // Ensure btn is properly set with the complete structure
      if (fields.btn?.setValue && generatedData.btn) {
        const buttonData = {
          ...generatedData.btn,
          type: 'custom',
          appearance: 'default',
        }
        console.log('Setting button data:', buttonData)
        fields.btn.setValue(buttonData)
      }
    } catch (error) {
      console.error('Error generating CTA1 content:', error)
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

export default CTA1Client
