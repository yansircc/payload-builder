'use client'

import { Button } from '@payloadcms/ui'
import { SparklesIcon } from 'lucide-react'
import { useGenerationStore } from '../store'

interface GenerateButtonProps {
  onGenerate: () => Promise<void>
}

/**
 * Button component for CTA content generation
 */
export function GenerateButton({ onGenerate }: GenerateButtonProps) {
  const { isLoading, setLoading } = useGenerationStore()

  const handleClick = async () => {
    if (isLoading) return

    setLoading(true)
    try {
      await onGenerate()
    } catch (error) {
      console.error('Error generating CTA content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={isLoading} icon={<SparklesIcon />}>
      {isLoading ? 'Generating...' : 'AI Generate'}
    </Button>
  )
}
