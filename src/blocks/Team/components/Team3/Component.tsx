import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Team3Fields } from '@/payload-types'
import { Fragment } from 'react'

import { ClientMotionDiv } from '../shared/motion'

export default function Team3({ team }: Team3Fields) {
  const { title, subtitle, description, people, links } = team
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <p className="semibold">{subtitle}</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          {title}
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          {description}
        </p>
        {links && links.length > 0 && (
          <ClientMotionDiv
            className="flex w-full flex-col justify-center gap-2 sm:flex-row"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {links.map((linkGroup, index) => (
              <div key={index} className="flex flex-col gap-2 sm:flex-row">
                {Object.entries(linkGroup).map(
                  ([key, link]) =>
                    link &&
                    typeof link === 'object' && <CMSLink key={key} {...link} />
                )}
              </div>
            ))}
          </ClientMotionDiv>
        )}
      </div>
      <div className="container mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-32">
        {people?.map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center bg-accent p-8"
          >
            <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
              <Media resource={person.avatar} />
            </Avatar>
            <p className="text-center font-medium">{person.name}</p>
            <p className="text-center text-muted-foreground">{person.role}</p>
            <p className="py-3 text-center text-sm text-muted-foreground">
              {person.description}
            </p>
            <div className="mt-2 flex gap-4">
              {person.links?.map((linkGroup, index) => (
                <Fragment key={index}>
                  {Object.entries(linkGroup).map(
                    ([key, link]) =>
                      link &&
                      typeof link === 'object' && (
                        <CMSLink key={key} {...link} />
                      )
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
