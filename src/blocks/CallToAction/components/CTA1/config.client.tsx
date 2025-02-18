'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useMemo, useState } from 'react'
import type { CTA1Fields } from '@/payload-types'
import { autogen } from './autogen'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA1Fields]: ReturnType<typeof useField<CTA1Fields[K]>>
}

// Type for streaming update
type StreamUpdate = Partial<
  Omit<CTA1Fields, 'btn'> & {
    btn?: Partial<CTA1Fields['btn']>
  }
>

export const CTA1Client: React.FC<GroupFieldClientProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  // Initialize individual fields
  const titleField = useField<string>({ path: getFieldPath(props, 'title') })
  const subtitleField = useField<string>({ path: getFieldPath(props, 'subtitle') })
  const iconField = useField<string>({ path: getFieldPath(props, 'icon') })
  const btnField = useField<CTA1Fields['btn']>({ path: getFieldPath(props, 'btn') })

  // Combine fields into a memoized object
  const fields = useMemo<FieldValues>(
    () => ({
      title: titleField,
      subtitle: subtitleField,
      icon: iconField,
      btn: btnField,
    }),
    [titleField, subtitleField, iconField, btnField],
  )

  // Helper to update a single field with type safety
  const updateField = useCallback(
    <K extends keyof FieldValues>(field: K, value: CTA1Fields[K] | null) => {
      const fieldValue = fields[field]
      if (fieldValue?.setValue) {
        fieldValue.setValue(value)
      }
    },
    [fields],
  )

  // Helper to clear all fields
  const clearFields = useCallback(() => {
    Object.keys(fields).forEach((key) => {
      updateField(key as keyof FieldValues, null)
    })
  }, [fields, updateField])

  // Handle streaming updates with proper type handling
  const handleStreamUpdate = useCallback(
    (partial: StreamUpdate) => {
      Object.entries(partial).forEach(([key, value]) => {
        if (value !== undefined) {
          // Type assertion here is safe because we know the key exists in FieldValues
          const fieldKey = key as keyof FieldValues
          const fieldValue = value as CTA1Fields[typeof fieldKey] | null
          updateField(fieldKey, fieldValue)
        }
      })
    },
    [updateField],
  )

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      clearFields()

      const { stream, objectPromise } = await autogen()

      // Process streaming updates
      for await (const partial of stream) {
        handleStreamUpdate(partial)
      }

      // Set final values
      const finalData = await objectPromise
      handleStreamUpdate(finalData)
    } catch (error) {
      console.error('Error generating CTA content:', error)
      // You could add a toast notification here
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
