import { Dribbble, Github, Linkedin } from 'lucide-react'

const people = [
  {
    id: 'person-1',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  },
  {
    id: 'person-2',
    name: 'Name',
    role: 'Role',
    description: 'Elig doloremque mollitia fugiat omnis!',
  },
  {
    id: 'person-3',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  },
  {
    id: 'person-4',
    name: 'Name',
    role: 'Role',
    description: 'Elig doloremque mollitia fugiat omnis!',
  },
  {
    id: 'person-5',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  },
  {
    id: 'person-6',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  },
  {
    id: 'person-7',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  },
  {
    id: 'person-8',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  },
]

const Team6 = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-start text-left">
        <p className="semibold">We&apos;re hiring</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">Meet our team</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat
          omnis! Porro facilis quo animi consequatur. Explicabo.
        </p>
      </div>
      <div className="container mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col sm:flex-row">
            <div className="mb-4 aspect-square w-full shrink-0 overflow-clip bg-accent sm:mb-0 sm:mr-5 sm:size-48">
              {/* Avatar */}
            </div>
            <div className="flex flex-1 flex-col items-start">
              <p className="w-full text-left font-medium">{person.name}</p>
              <p className="w-full text-left text-muted-foreground">{person.role}</p>
              <p className="w-full py-2 text-sm text-muted-foreground">{person.description}</p>
              <div className="my-2 flex items-start gap-4">
                <a href="#">
                  <Github className="size-4 text-muted-foreground" />
                </a>
                <a href="#">
                  <Linkedin className="size-4 text-muted-foreground" />
                </a>
                <a href="#">
                  <Dribbble className="size-4 text-muted-foreground" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team6
