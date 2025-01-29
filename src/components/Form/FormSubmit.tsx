'use client'

import { Button } from '@/components/ui/button'

interface FormSubmitProps {
  children: React.ReactNode
}

export function FormSubmit({ children }: FormSubmitProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the button click
    e.preventDefault()

    // Find the closest form element
    const form = (e.target as HTMLElement).closest('form')
    if (!form) return

    // Create and dispatch a submit event
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    form.dispatchEvent(submitEvent)

    // Handle the form data
    const formData = new FormData(form)
    console.log('Form submitted:', Object.fromEntries(formData))
  }

  return (
    <Button type="submit" className="w-full" onClick={handleSubmit}>
      {children}
    </Button>
  )
}
