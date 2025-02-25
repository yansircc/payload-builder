import { ConsentBannerWidget } from './components/ConsentBanner/Component'
import { WhatsAppWidget } from './components/Whatsapp/Component'

export const widgetComponents = {
  whatsapp: WhatsAppWidget,
  consentBanner: ConsentBannerWidget,
} as const
