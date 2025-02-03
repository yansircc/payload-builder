'use client'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

interface LogosFields {
  title: string
  subtitle: string
  logos: {
    id?: string | null
    name: string
    logo: MediaType | string
    className?: string
  }[]
}

interface Logos8Props {
  logos: LogosFields
}

export default function Logos8({ logos }: Logos8Props) {
  const { title, subtitle, logos: logoItems } = logos

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </ClientMotionDiv>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-12">
            {logoItems?.map((logo, index) => (
              <ClientMotionDiv
                key={logo.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Media
                  resource={logo.logo}
                  alt={logo.name}
                  className={logo.className || 'h-7 w-auto'}
                  size="thumbnail"
                />
              </ClientMotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
