import clsx from 'clsx'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Team1Fields } from '@/payload-types'

export default function Team1({ team }: Team1Fields) {
  const { title, subtitle, description, people = [] } = team

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <p className="text-muted-foreground">{subtitle}</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">{title}</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">{description}</p>
      </div>
      <div className="container mt-16">
        <div
          className={clsx('grid gap-x-8 gap-y-16', {
            'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto': people?.length === 2,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto': people?.length === 3,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': people!.length >= 4,
          })}
        >
          {people?.map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                <Media resource={person.avatar} />
              </Avatar>
              <p className="text-center font-medium">{person.name}</p>
              <p className="text-center text-muted-foreground">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
