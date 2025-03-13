import { Fragment } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Team2Fields } from '@/payload-types'

export default function Team2({ team }: Team2Fields) {
  const { title, subtitle, description, people } = team
  return (
    <section className="py-32">
      <div className="container flex flex-col items-start text-left">
        <p className="text-muted-foreground">{subtitle}</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">{title}</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-{xl">{description}</p>
      </div>
      <div className="container mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {people?.map((person) => (
          <div key={person.id} className="flex flex-col items-start">
            <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
              <Media resource={person.avatar} />
            </Avatar>
            <p className="font-medium">{person.name}</p>
            <p className="text-muted-foreground">{person.role}</p>
            <p className="py-3 text-sm text-muted-foreground">{person.description}</p>
            <div className="mt-2 flex gap-4">
              {person.links?.map(
                (linkGroup, index) =>
                  linkGroup.link && (
                    <a
                      key={index}
                      href={linkGroup.link.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
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
        ))}
      </div>
    </section>
  )
}
