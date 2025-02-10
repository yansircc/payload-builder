'use client'

import { TextField, useField } from '@payloadcms/ui'
import type { TextFieldClient } from 'payload'
import React, { useEffect } from 'react'
import { mockData } from '../mock'

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

  // Determine if this is a question or answer field from the path
  const type = path.endsWith('question') ? 'question' : 'answer'

  useEffect(() => {
    // Only set mock data if the field is empty
    if (!value) {
      // Extract the index from the path (e.g., "faq.faqs.0.question" -> 0)
      const match = path.match(/faqs\.(\d+)\./)
      if (match?.[1]) {
        const currentIndex = parseInt(match[1], 10)
        if (currentIndex < mockData.faqs.length) {
          const mockFaq = mockData.faqs[currentIndex]
          if (mockFaq) {
            setValue(type === 'question' ? mockFaq.question : mockFaq.answer)
          }
        }
      }
    }
  }, [value, setValue, type, path])

  const customField: Omit<TextFieldClient, 'type'> = {
    ...field,
    label: type === 'question' ? 'Question' : 'Answer',
    required: true,
    admin: {
      ...field.admin,
      placeholder: type === 'question' ? 'Enter question...' : 'Enter answer...',
      autoComplete: 'off',
      rtl: false,
    },
  }

  return <TextField path={path} field={customField} />
}

export default FAQField
