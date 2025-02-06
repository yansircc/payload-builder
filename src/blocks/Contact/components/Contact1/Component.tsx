import { Form } from '@/components/Form'
import { Media } from '@/components/Media'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import type { Contact1Fields } from '@/payload-types'
import { Check } from 'lucide-react'

export default function Contact1({ contact }: Contact1Fields) {
  const { title, description, list, avatars, logos, form } = contact

  return (
    <section className="relative py-32">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 -top-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 -top-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 -top-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)]"></div>
      <div className="container grid w-full grid-cols-1 gap-x-32 overflow-hidden lg:grid-cols-2">
        <div className="w-full pb-10 md:space-y-10 md:pb-0">
          <div className="space-y-4 md:max-w-[40rem]">
            <h1 className="text-4xl font-medium lg:text-5xl">{title}</h1>
            <div className="text-muted-foreground md:text-base lg:text-lg lg:leading-7">
              {description}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="space-y-16 pb-20 lg:pb-0">
              <div className="space-y-6">
                <div className="mt-16 flex overflow-hidden">
                  {avatars?.map((avatar, idx) => (
                    <Avatar
                      key={idx}
                      className={idx > 0 ? '-ml-4 size-11' : 'size-11'}
                    >
                      <AvatarImage>
                        <Media resource={avatar.image} />
                      </AvatarImage>
                    </Avatar>
                  ))}
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-semibold">What you can expect:</p>
                  {list?.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5">
                      <Check className="size-5 shrink-0 text-muted-foreground" />
                      <p className="text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-12">
                {logos?.map((logo, idx) => (
                  <Media
                    key={idx}
                    resource={logo.image}
                    imgClassName="h-6 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center lg:mt-2.5">
          <div className="relative flex w-full min-w-[20rem] max-w-[30rem] flex-col items-center overflow-visible md:min-w-[24rem]">
            <div className="w-full z-10 space-y-6">
              <div className="w-full space-y-6 rounded-xl border border-border bg-background px-6 py-10 shadow-sm">
                <Form
                  fields={form?.fields || []}
                  submitLabel={form?.submitButton?.label}
                  className="flex flex-col gap-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
