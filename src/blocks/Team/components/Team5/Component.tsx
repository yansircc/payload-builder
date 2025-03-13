import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Team5Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Team5({ team }: Team5Fields) {
  const { title, subtitle, description, people, links } = team
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <p className="text-muted-foreground">{subtitle}</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">{title}</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">{description}</p>
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
                    link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                )}
              </div>
            ))}
          </ClientMotionDiv>
        )}
      </div>
      <div className="container mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {people?.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <div className="relative mb-4 w-full overflow-hidden md:mb-5">
              <div className="aspect-square w-full">
                <Media
                  resource={person.avatar}
                  imgClassName="h-full w-full object-cover object-center"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="w-full space-y-2">
              <p className="font-medium">{person.name}</p>
              <p className="text-muted-foreground">{person.role}</p>
              <p className="text-sm text-muted-foreground">{person.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
