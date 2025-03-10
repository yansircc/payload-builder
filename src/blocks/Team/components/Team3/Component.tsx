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
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{subtitle}</p>
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
            className="group relative flex flex-col items-center rounded-xl bg-card p-8 transition-all hover:shadow-lg"
          >
            <Avatar className="mb-6 size-24 ring-2 ring-primary ring-offset-2 transition-transform group-hover:scale-105">
              <Media resource={person.avatar} />
            </Avatar>
            <p className="text-xl font-semibold">{person.name}</p>
            <p className="text-primary">{person.role}</p>
            <p className="mt-4 text-center text-muted-foreground">{person.description}</p>
            <div className="mt-6 flex gap-6">
              {person.links?.map((linkGroup, index) => (
                <Fragment key={index}>
                  {Object.entries(linkGroup).map(
                    ([key, link]) =>
                      link &&
                      typeof link === 'object' && (
                        <CMSLink
                          key={key}
                          {...link}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        />
                      ),
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
