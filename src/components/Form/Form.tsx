import { FormField, type FormField as FormFieldType } from './FormField'
import { FormSubmit } from './FormSubmit'

export interface FormProps {
  fields?: FormFieldType[]
  submitLabel?: string
  className?: string
}

export function Form({ fields = [], submitLabel = 'Submit', className }: FormProps) {
  return (
    <form className={className}>
      {fields.map((field, idx) => (
        <FormField key={idx} {...field} />
      ))}
      <FormSubmit>{submitLabel}</FormSubmit>
    </form>
  )
}
