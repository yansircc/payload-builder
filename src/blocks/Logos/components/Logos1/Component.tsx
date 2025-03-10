import { Media } from '@/components/Media'
import { Logos1Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Logos1({ logos }: Logos1Fields) {
  const { title, logos: logoItems } = logos

  return (
    <section className="container flex flex-wrap items-center justify-between gap-12 py-32">
      {title && (
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg leading-[140%] tracking-[-0.32px] text-primary">{title}</p>
        </ClientMotionDiv>
      )}

      <div className="flex flex-wrap items-center gap-x-8 gap-y-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 lg:gap-[60px]">
        {logoItems?.map((item, index) => (
          <ClientMotionDiv
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Media
              resource={item.logo}
              className="h-12 w-auto max-w-[109px] object-contain"
              size="thumbnail"
            />
          </ClientMotionDiv>
        ))}
      </div>
    </section>
  )
}
