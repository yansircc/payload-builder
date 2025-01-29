import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'

export interface FormFieldOption {
  label: string
  value: string
}

export interface FormField {
  formField: {
    label: string
    type: 'text' | 'email' | 'textarea' | 'tel' | 'number' | 'select' | 'radio'
    placeholder?: string | null
    required: 'yes' | 'no'
    options?: FormFieldOption[] | null
  }
}

export interface FormFieldProps {
  formField: FormField['formField']
  className?: string
}

export function FormField({ formField, className }: FormFieldProps) {
  const { label, type, placeholder, required, options } = formField

  if (type === 'textarea') {
    return (
      <div className={cn('grid w-full gap-1.5', className)}>
        <Label htmlFor={label}>{label}</Label>
        <Textarea
          id={label}
          name={label}
          placeholder={placeholder || undefined}
          required={required === 'yes'}
        />
      </div>
    )
  }

  if (type === 'select' || type === 'radio') {
    return (
      <div className={cn('grid w-full items-center gap-1.5', className)}>
        <Label htmlFor={label}>{label}</Label>
        <Select>
          <SelectTrigger id={label} name={label}>
            <SelectValue placeholder={placeholder || undefined} />
          </SelectTrigger>
          <SelectContent>
            {(options || []).map((option, idx) => (
              <SelectItem key={idx} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        name={label}
        type={type}
        placeholder={placeholder || undefined}
        required={required === 'yes'}
      />
    </div>
  )
}
