import { Button } from '@/components/ui/button'

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

const Team5 = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <p className="semibold">We&apos;re hiring</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">Meet our team</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat
          omnis! Porro facilis quo animi consequatur. Explicabo.
        </p>
        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
          <Button variant="outline" className="w-full sm:w-auto">
            Secondary
          </Button>
          <Button className="w-full sm:w-auto">Primary</Button>
        </div>
      </div>
      <div className="container mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-32">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <div className="mb-4 aspect-square w-full overflow-clip bg-accent md:mb-5">
              {/* Avatar */}
            </div>
            <p className="w-full text-left font-medium">{person.name}</p>
            <p className="w-full text-left text-muted-foreground">{person.role}</p>
            <p className="w-full py-3 text-sm text-muted-foreground">{person.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team5
