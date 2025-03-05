'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FormProvider, useForm } from 'react-hook-form'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import type { ExtendedTextField } from './types'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: Omit<FormType, 'fields'> & {
    fields: (FormFieldBlock | ExtendedTextField)[]
  }
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container mx-auto lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12 text-center text-lg text-muted-foreground"
          data={introContent}
          enableGutter={false}
        />
      )}
      <div className="p-6 lg:p-8 border border-border rounded-xl shadow-sm bg-card">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="text-center py-6">
              <RichText data={confirmationMessage} />
            </div>
          )}
          {isLoading && !hasSubmitted && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Loading, please wait...</p>
            </div>
          )}
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
              {`${error.status || '500'}: ${error.message || ''}`}
            </div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {formFromProps?.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <div
                        key={index}
                        className={`${
                          field.blockType === 'checkbox'
                            ? 'md:col-span-12 flex items-start space-x-2'
                            : field.blockType === 'textarea' ||
                                field.blockType === 'country' ||
                                field.blockType === 'state' ||
                                field.blockType === 'message' ||
                                field.blockType === 'email'
                              ? 'md:col-span-12'
                              : field.name === 'firstName' || field.name === 'lastName'
                                ? 'md:col-span-6'
                                : 'md:col-span-12'
                        }`}
                      >
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <Button form={formID} type="submit" size="lg" className="min-w-[160px]">
                  {submitButtonLabel}
                </Button>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
