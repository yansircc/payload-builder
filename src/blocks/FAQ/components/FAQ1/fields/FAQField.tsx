'use client'

import { TextField, useField } from '@payloadcms/ui'
import type { TextFieldClient } from 'payload'
import React, { useEffect } from 'react'
import { mockData } from '../data/mock'
import { fieldConfigs } from './types'

interface Props {
  path: string
  field: {
    name: string
    label?: string
    required?: boolean
    admin?: {
      description?: string
      placeholder?: string
    }
  }
}

const FAQField: React.FC<Props> = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })

  // Extract the field type from the path (e.g., "question", "answer")
  const getFieldType = (path: string): string => {
    const fieldMatch = path.match(/\.([^.]+)$/)
    return fieldMatch?.[1] || ''
  }

  const fieldType = getFieldType(path)
  const fieldConfig = fieldConfigs[fieldType]

  useEffect(() => {
    if (!value) {
      const match = path.match(/faqs\.(\d+)\./)
      if (match?.[1]) {
        const currentIndex = parseInt(match[1], 10)
        if (currentIndex < mockData.faqs.length) {
          const mockFaq = mockData.faqs[currentIndex]
          if (mockFaq && fieldType in mockFaq) {
            setValue(mockFaq[fieldType as keyof typeof mockFaq])
          }
        }
      }
    }
  }, [value, setValue, fieldType, path])

  if (!fieldConfig) return null

  const customField: Omit<TextFieldClient, 'type'> = {
    ...field,
    label: fieldConfig.label,
    required: true,
    admin: {
      ...field.admin,
      placeholder: fieldConfig.placeholder,
      autoComplete: 'off',
      rtl: false,
    },
  }

  return <TextField path={path} field={customField} />
}

export default FAQField
