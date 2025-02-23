'use client'

import { GroupField, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect } from 'react'
import type { About1Fields } from '@/payload-types'
import { GenerateButton } from '../shared/components'
import { getFieldPath } from '../shared/utils'
import { autogen } from './autogen'
import { useAbout1Store } from './store'

export function About1Client(props: GroupFieldClientProps) {
  const { setFieldRef, updateFields, clearFields } = useAbout1Store()

  // Directly initialize all fields at the top level
  const mainTitleField = useField<string>({ path: getFieldPath(props, 'mainSection.title') })
  const mainDescriptionField = useField<string>({
    path: getFieldPath(props, 'mainSection.description'),
  })

  const missionLabelField = useField<string>({ path: getFieldPath(props, 'missionSection.label') })
  const missionDescriptionField = useField<string>({
    path: getFieldPath(props, 'missionSection.description'),
  })
  const missionImageField = useField<string>({ path: getFieldPath(props, 'missionSection.image') })

  const featuresTitleField = useField<string>({
    path: getFieldPath(props, 'featuresSection.title'),
  })
  const featuresDescriptionField = useField<string>({
    path: getFieldPath(props, 'featuresSection.description'),
  })
  const featuresField = useField<About1Fields['featuresSection']['features']>({
    path: getFieldPath(props, 'featuresSection.features'),
  })

  const teamLabelField = useField<string>({ path: getFieldPath(props, 'teamSection.label') })
  const teamTitleField = useField<string>({ path: getFieldPath(props, 'teamSection.title') })
  const teamDescriptionField = useField<string>({
    path: getFieldPath(props, 'teamSection.description'),
  })
  const teamImageField = useField<string>({ path: getFieldPath(props, 'teamSection.image') })

  useEffect(() => {
    const fields = {
      'mainSection.title': mainTitleField,
      'mainSection.description': mainDescriptionField,
      'missionSection.label': missionLabelField,
      'missionSection.description': missionDescriptionField,
      'missionSection.image': missionImageField,
      'featuresSection.title': featuresTitleField,
      'featuresSection.description': featuresDescriptionField,
      'featuresSection.features': featuresField,
      'teamSection.label': teamLabelField,
      'teamSection.title': teamTitleField,
      'teamSection.description': teamDescriptionField,
      'teamSection.image': teamImageField,
    }

    Object.entries(fields).forEach(([key, field]) => {
      setFieldRef(key as keyof About1Fields, field)
    })
  }, [
    mainTitleField,
    mainDescriptionField,
    missionLabelField,
    missionDescriptionField,
    missionImageField,
    featuresTitleField,
    featuresDescriptionField,
    featuresField,
    teamLabelField,
    teamTitleField,
    teamDescriptionField,
    teamImageField,
    setFieldRef,
  ])

  const handleGenerate = useCallback(async () => {
    clearFields()
    const { stream, objectPromise } = await autogen()

    for await (const partial of stream) {
      updateFields(partial as Partial<About1Fields>)
    }
    updateFields(await objectPromise)
  }, [clearFields, updateFields])

  return (
    <div className="space-y-4">
      <GenerateButton onGenerate={handleGenerate} />
      <GroupField {...props} />
    </div>
  )
}

export default About1Client
