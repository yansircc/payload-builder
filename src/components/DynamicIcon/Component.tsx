import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface DynamicIconProps {
  name: string
  className?: string
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = Icons[name as keyof typeof Icons] as LucideIcon | undefined
  return Icon ? <Icon className={className} /> : null
}
