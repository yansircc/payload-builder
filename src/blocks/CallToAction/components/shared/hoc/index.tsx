'use client'

import type { GroupFieldClientProps } from 'payload'
import { useCallback, useEffect, useMemo, type ComponentType } from 'react'
import { GenerateButton } from '..'
import type { BaseStore } from '../store/types'
import { useFields } from './useFields'

interface WithFieldRegistrationProps<T extends Record<string, any>> {
  fields: Array<keyof T>
  Component: ComponentType<GroupFieldClientProps>
  useStore?: () => BaseStore<T>
}

export function withFieldRegistration<T extends Record<string, any>>({
  fields,
  Component,
  useStore,
}: WithFieldRegistrationProps<T>) {
  return function WrappedComponent(props: GroupFieldClientProps) {
    // Initialize fields using our custom hook
    const fieldRefs = useFields<T>(props, fields)

    // Get store actions if provided
    const store = useStore?.()

    // Register fields with store if available
    useEffect(() => {
      if (!store?.setFieldRef) return

      // Register all fields at once to prevent multiple re-renders
      const registrations = Object.entries(fieldRefs).map(([key, field]) => ({
        key: key as keyof T,
        field,
      }))

      registrations.forEach(({ key, field }) => {
        store.setFieldRef(key, field)
      })
    }, [fieldRefs, store])

    // Extract component name from the path
    const getComponentName = (path: string) => {
      if (!path) throw new Error('Invalid path: path is empty')

      // The path will be something like "layout.0.cta-1"
      const parts = path.split('.')
      const lastPart = parts[parts.length - 1]

      if (!lastPart) throw new Error('Invalid path format: cannot extract component name')

      // Convert "cta-1" to "CTA1"
      return lastPart
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    }

    // Handle AI generation if store is available
    const handleGenerate = useCallback(async () => {
      if (!store) {
        console.error('Store is not available')
        return
      }

      const { clearFields, updateFields } = store
      clearFields()

      try {
        if (!props.path) {
          throw new Error('Component path is not available')
        }

        const componentName = getComponentName(props.path)

        // Using a more reliable dynamic import pattern that matches the file structure
        const autogenModule = await import(`../../${componentName.toUpperCase()}/autogen`).catch(
          (error) => {
            throw new Error(`Failed to load autogen module for ${componentName}: ${error.message}`)
          },
        )

        const { stream, objectPromise } = await autogenModule.autogen()

        for await (const partial of stream) {
          updateFields(partial as Partial<T>)
        }

        const finalData = await objectPromise
        updateFields(finalData)
      } catch (error) {
        console.error('Failed to generate content:', error instanceof Error ? error.message : error)
      }
    }, [store, props.path])

    // Memoize the wrapped component to prevent unnecessary re-renders
    const wrappedComponent = useMemo(
      () => (
        <div className="space-y-4">
          {store && <GenerateButton onGenerate={handleGenerate} />}
          <Component {...props} />
        </div>
      ),
      [store, handleGenerate, props],
    )

    return wrappedComponent
  }
}
