import type { TeamBlock } from '@/payload-types'

import { teamComponents } from '.'

export const RenderTeam: React.FC<TeamBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const TeamToRender = teamComponents[style]

  if (!TeamToRender) return null

  const teamProps = props[style]
  if (!teamProps) return null

  return <TeamToRender {...teamProps} />
}
