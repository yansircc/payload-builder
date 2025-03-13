import { Fragment } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Team3Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Team3({ team }: Team3Fields) {
  const { title, subtitle, description, people, links } = team
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {subtitle}
        </p>
        <h2 className="my-6 text-pretty text-3xl font-bold lg:text-5xl">{title}</h2>
        <p className="mb-12 max-w-3xl text-lg text-muted-foreground">{description}</p>
        {links && links.length > 0 && (
          <ClientMotionDiv
            className="flex w-full flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {links.map((linkGroup, index) => (
              <div key={index} className="flex flex-col gap-4 sm:flex-row">
                {Object.entries(linkGroup).map(
                  ([key, link]) =>
                    link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                )}
              </div>
            ))}
          </ClientMotionDiv>
        )}
      </div>
      <div className="container mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {people?.map((person) => (
          <div
            key={person.id}
            className="group relative flex flex-col items-center rounded-xl bg-muted/40 p-8 text-center transition-all hover:shadow-lg"
          >
            <Avatar className="mb-6 size-24 ring-2 ring-offset-2 transition-transform group-hover:scale-105">
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
        ))}
      </div>
    </section>
  )
}
