import type { Payload } from 'payload'
import type { Popup } from '@/payload-types'

type CreatePopupData = Omit<Popup, 'id' | 'updatedAt' | 'createdAt' | 'sizes'>

export async function seedPopups({
  payload,
  tenant,
}: {
  payload: Payload
  tenant: { id: string }
}) {
  // Create sample popups
  const [welcomePopup, newsletterPopup, exitIntentPopup] = await Promise.all([
    payload.create({
      collection: 'popups',
      data: {
        title: 'Welcome Message',
        basicSettings: {
          title: 'Welcome Message',
          content: "Welcome to our site! We're glad you're here.",
        },
        triggerSettings: {
          triggerType: 'pageLoad',
          delay: 2,
          frequency: 'session',
        },
        appearanceSettings: {
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          size: 'default',
          animation: 'fade',
          position: 'center',
          backdrop: 'default',
        },
        tenant: tenant.id,
        _status: 'published',
      } as CreatePopupData,
    }),
    payload.create({
      collection: 'popups',
      data: {
        title: 'Newsletter Signup',
        basicSettings: {
          title: 'Newsletter Signup',
          content: 'Subscribe to our newsletter for the latest updates!',
        },
        triggerSettings: {
          triggerType: 'scrollDepth',
          scrollDepthPercentage: 50,
          frequency: 'weekly',
        },
        appearanceSettings: {
          backgroundColor: '#F8F9FA',
          textColor: '#212529',
          size: 'sm',
          animation: 'slideUp',
          position: 'bottom',
          backdrop: 'default',
        },
        tenant: tenant.id,
        _status: 'published',
      } as CreatePopupData,
    }),
    payload.create({
      collection: 'popups',
      data: {
        title: 'Exit Intent Offer',
        basicSettings: {
          title: 'Exit Intent Offer',
          content: "Wait! Don't leave without checking out our special offer!",
        },
        triggerSettings: {
          triggerType: 'exitIntent',
          frequency: 'daily',
        },
        appearanceSettings: {
          backgroundColor: '#FFF5F5',
          textColor: '#E53E3E',
          size: 'lg',
          animation: 'scale',
          position: 'center',
          backdrop: 'blur',
        },
        tenant: tenant.id,
        _status: 'published',
      } as CreatePopupData,
    }),
  ])

  return {
    welcomePopup,
    newsletterPopup,
    exitIntentPopup,
  }
}
