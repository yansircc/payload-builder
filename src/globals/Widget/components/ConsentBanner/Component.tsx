'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Widget } from '@/payload-types'

const CONSENT_KEY = 'user-consent-preference'

export function ConsentBannerWidget({ consentBanner }: Widget) {
  const { title, description, acceptButtonText, rejectButtonText, privacyPolicyLink, isActive } =
    consentBanner || {}
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const hasUserConsent = localStorage.getItem(CONSENT_KEY)
    if (!hasUserConsent && isActive) {
      setIsVisible(true)
    }
  }, [isActive])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed z-50 m-4 md:m-6 bottom-0 left-0 right-0">
      <Card className="w-full bg-background max-w-lg mx-auto shadow-lg md:max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
          {privacyPolicyLink && (
            <a
              href={privacyPolicyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline mt-2 inline-block"
            >
              Privacy Policy
            </a>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          <Button variant="link" size="sm" onClick={handleReject}>
            {rejectButtonText}
          </Button>
          <Button size="sm" onClick={handleAccept}>
            {acceptButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
