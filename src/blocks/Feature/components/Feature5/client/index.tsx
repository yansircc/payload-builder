'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import { createStore, GenerateButton, getFieldPath } from '@/blocks/shared'
import type { Feature5Fields } from '@/payload-types'
import { autogen } from '../server/autogen'

const FIELDS: Array<keyof Feature5Fields> = ['features', 'testimonial']
const TESTIMONIAL_SUBFIELDS = ['quote', 'name', 'role', 'company', 'image'] as const
const useFeature5Store = createStore<Feature5Fields>(FIELDS)

function Feature5Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useFeature5Store()

  // Initialize fields at the component level
  const featuresField = useField<Feature5Fields['features']>({
    path: getFieldPath(props, 'features'),
  })

  const quoteField = useField<string>({
    path: getFieldPath(props, 'testimonial.quote'),
  })
  const nameField = useField<string>({
    path: getFieldPath(props, 'testimonial.name'),
  })
  const roleField = useField<string>({
    path: getFieldPath(props, 'testimonial.role'),
  })
  const companyField = useField<string>({
    path: getFieldPath(props, 'testimonial.company'),
  })
  const imageField = useField<string>({
    path: getFieldPath(props, 'testimonial.image'),
  })

  const testimonialFields = useMemo(
    () => ({
      quote: quoteField,
      name: nameField,
      role: roleField,
      company: companyField,
      image: imageField,
    }),
    [quoteField, nameField, roleField, companyField, imageField],
  )

  const fieldsMap = useMemo(
    () => ({
      features: featuresField,
      testimonial: {
        value: {
          quote: testimonialFields.quote.value ?? '',
          name: testimonialFields.name.value ?? '',
          role: testimonialFields.role.value ?? '',
          company: testimonialFields.company.value ?? '',
        },
        setValue: (value: Feature5Fields['testimonial']) => {
          if (value) {
            TESTIMONIAL_SUBFIELDS.forEach((field) => {
              testimonialFields[field].setValue(value[field] ?? '')
            })
          } else {
            TESTIMONIAL_SUBFIELDS.forEach((field) => {
              testimonialFields[field].setValue('')
            })
          }
        },
      },
    }),
    [featuresField, testimonialFields],
  )

  useEffect(() => {
    FIELDS.forEach((field) => {
      setFieldRef(field, fieldsMap[field])
    })
  }, [fieldsMap, setFieldRef])

  const handleGenerate = useCallback(async () => {
    try {
      clearFields()
      const generatedData = await autogen()
      updateFields(generatedData)
    } catch (error) {
      console.error('Error generating FAQ content:', error)
    }
    return Promise.resolve()
  }, [clearFields, updateFields])

  return (
    <div className="space-y-4">
      <GenerateButton onGenerate={handleGenerate} />
      <GroupField {...props} />
    </div>
  )
}

export default Feature5Client
