'use client'

import { Button, GroupField, useField } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import type { GroupFieldClientProps } from 'payload'
import { CTA3Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'

// Helper function to get field path
function getFieldPath(props: GroupFieldClientProps, fieldName: string): string {
  return `${props.parentPath}.${props.field.name}.${fieldName}`
}

// Helper type for field values
type FieldValues = {
  [K in keyof CTA3Fields]: ReturnType<typeof useField<CTA3Fields[K]>>
}

// Sample data generator for buttons
function generateButtonsData() {
  return [
    {
      link: {
        type: 'custom',
        url: '#',
        label: 'Get Started',
        suffixIcon: 'ArrowRight',
        appearance: 'default',
      },
    },
    {
      link: {
        type: 'custom',
        url: '#',
        label: 'Learn More',
        suffixIcon: 'ArrowRight',
        appearance: 'ghost',
      },
    },
  ]
}

// Sample data generator for feature list
function generateListData() {
  return [
    {
      link: {
        type: 'custom',
        url: '#',
        label: 'Key Feature One',
        suffixIcon: 'ChevronRight',
        appearance: 'ghost',
      },
      description: 'Discover how our first key feature can transform your workflow.',
    },
    {
      link: {
        type: 'custom',
        url: '#',
        label: 'Key Feature Two',
        suffixIcon: 'ChevronRight',
        appearance: 'ghost',
      },
      description: 'Learn about our second key feature and its powerful capabilities.',
    },
    {
      link: {
        type: 'custom',
        url: '#',
        label: 'Key Feature Three',
        suffixIcon: 'ChevronRight',
        appearance: 'ghost',
      },
      description: 'Explore the benefits of our third key feature for your business.',
    },
  ]
}

export const TestField: React.FC<GroupFieldClientProps> = (props) => {
  // Use a more structured approach to manage fields
  const fields: FieldValues = {
    title: useField<string>({ path: getFieldPath(props, 'title') }),
    subtitle: useField<string>({ path: getFieldPath(props, 'subtitle') }),
    buttons: useField<CTA3Fields['buttons']>({ path: getFieldPath(props, 'buttons') }),
    list: useField<CTA3Fields['list']>({ path: getFieldPath(props, 'list') }),
  }

  const handleClick = async () => {
    try {
      console.log('props.field.fields', props.field.fields)
      // Generate data using AI for title and subtitle
      const generatedData = await getObject(props.field.fields)

      // Set text field values
      if (generatedData.title && fields.title?.setValue) {
        fields.title.setValue(generatedData.title as string)
      }
      if (generatedData.subtitle && fields.subtitle?.setValue) {
        fields.subtitle.setValue(generatedData.subtitle as string)
      }

      // Set buttons array
      if (fields.buttons?.setValue) {
        fields.buttons.setValue(generateButtonsData())
      }

      // Set feature list array
      if (fields.list?.setValue) {
        fields.list.setValue(generateListData())
      }
    } catch (error) {
      console.error('Error generating content:', error)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleClick} className="flex items-center gap-2">
        <SparklesIcon className="mr-4" /> AI Generate
      </Button>
      <GroupField {...props} />
    </div>
  )
}

export default TestField
