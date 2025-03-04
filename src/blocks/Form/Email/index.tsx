import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

// ... existing imports ...

export const Email: React.FC<
  EmailField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="text-muted-foreground">
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, {
          required: required ? 'This field is required' : false,
          pattern: {
            value: /^\S[^\s@]*@\S+$/,
            message: 'Please enter a valid email address',
          },
        })}
      />
      {errors[name] && (
        <div className="text-sm text-destructive mt-1">{errors[name]?.message as string}</div>
      )}
    </Width>
  )
}
