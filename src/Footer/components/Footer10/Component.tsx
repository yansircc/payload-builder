'use client'

import { Media } from '@/components/Media'
import { Footer10Fields } from '@/payload-types'
import { useEffect, useState } from 'react'

export default function Footer10({ footer }: Footer10Fields) {
  const { logo, bottomText } = footer
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateLondonTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/London',
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        second: '2-digit' as const,
      }
      const londonTime = new Intl.DateTimeFormat('en-GB', options).format(
        new Date()
      )
      setTime(londonTime)
    }

    updateLondonTime()
    const intervalId = setInterval(updateLondonTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div>
            {logo && (
              <Media
                resource={logo}
                className="aspect-[13.7] w-full object-cover"
                priority
                alt="footer logo"
              />
            )}
          </div>
          <div className="flex flex-col items-center justify-between py-12 text-lg md:flex-row">
            <div>{bottomText?.copyright}</div>
            <div>Time → {time}</div>
            <div>{bottomText?.description}</div>
          </div>
        </footer>
      </div>
    </section>
  )
}
