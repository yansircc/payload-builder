'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type { CTA1Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA1Fields]: ReturnType<typeof useField<CTA1Fields[K]>>
}

export const TestField: React.FC<GroupFieldClientProps> = (props) => {
  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    // image: useField<string>({ path: getFieldPath(props, 'image') }),
    icon: useField<string>({ path: getFieldPath(props, 'icon') }),
    btn: useField<CTA1Fields['btn']>({ path: getFieldPath(props, 'btn') }),
  }

  const handleClick = async () => {
    try {
      // Generate data using AI
      const generatedData = await getObject(props.field.fields)

      // Set all field values at once
      Object.entries(generatedData).forEach(([key, value]) => {
        const field = fields[key as keyof CTA1Fields]
        if (field?.setValue) {
          field.setValue(value)
        }
      })
    } catch (error) {
      console.error('Error generating content:', error)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleClick}>AI Generate</Button>
      <GroupField {...props} />
    </div>
  )
}

export default TestField
