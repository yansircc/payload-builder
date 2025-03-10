import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

export interface ExtendedTextField extends TextField {
  numberOnly?: boolean
}
export const Text: React.FC<
  ExtendedTextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width, numberOnly = false }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="text-foreground">
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        className="text-foreground"
        defaultValue={defaultValue}
        id={name}
        type={numberOnly ? 'number' : 'text'}
        min={numberOnly ? 0 : undefined}
        step={numberOnly ? 1 : undefined}
        {...register(name, {
          required,
          ...(numberOnly && {
            valueAsNumber: true,
            validate: (value) => {
              if (Number.isNaN(value)) return 'Please enter a valid number'
              if (value < 0) return 'Value must be positive'
              return true
            },
          }),
        })}
      />
      {errors[name] && <Error />}
    </Width>
  )
}
