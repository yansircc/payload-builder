import { Fragment } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Team6Fields } from '@/payload-types'

export default function Team6({ team }: Team6Fields) {
  const { title, subtitle, description, people } = team
  return (
    <section className="py-32">
      <div className="container flex flex-col items-start text-left">
        <p className="text-muted-foreground">{subtitle}</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">{title}</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">{description}</p>
      </div>
      <div className="container mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {people?.map((person) => (
          <div key={person.id} className="flex flex-col sm:flex-row">
            <div className="mb-4 aspect-square w-full shrink-0 overflow-clip bg-accent sm:mb-0 sm:mr-5 sm:size-48">
              <Media resource={person.avatar} imgClassName="aspect-square" />
            </div>
            <div className="flex flex-1 flex-col items-start">
              <p className="w-full text-left font-medium">{person.name}</p>
              <p className="w-full text-left text-muted-foreground">{person.role}</p>
              <p className="w-full py-2 text-sm text-muted-foreground">{person.description}</p>
              <div className="mt-2 flex gap-4">
                {person.links?.map(
                  (linkGroup, index) =>
                    linkGroup.link && (
                      <a
                        key={index}
                        href={linkGroup.link.url || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {linkGroup.link.prefixIcon && (
                          <Media
                            resource={{
                              url: linkGroup.link.prefixIcon,
                              alt: 'Social Icon',
                              width: 20,
                              height: 20,
                              id: `social-${index}`,
                              createdAt: new Date().toISOString(),
                              updatedAt: new Date().toISOString(),
                            }}
                            imgClassName="h-5 w-5 object-contain"
                            htmlElement="span"
                          />
                        )}
                      </a>
                    ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
