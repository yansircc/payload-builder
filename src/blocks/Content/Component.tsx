import React from 'react'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container py-24">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  'group p-6 rounded-xl transition-all duration-300 hover:bg-accent/5',
                  'flex flex-col space-y-4',
                  {
                    'md:col-span-2': size !== 'full',
                  },
                )}
                key={index}
              >
                <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                  {richText && (
                    <RichText
                      data={richText}
                      enableGutter={false}
                      className="text-muted-foreground"
                    />
                  )}
                </div>

                {enableLink && link && (
                  <div className="mt-auto pt-4">
                    <CMSLink
                      {...link}
                      className="group/link inline-flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-all duration-300 relative 
                    after:absolute after:bottom-0 after:left-0 after:w-full after:h-px 
                    after:bg-blue-600 after:origin-left after:scale-x-0 hover:after:scale-x-100 
                    after:transition-transform after:duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </CMSLink>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
