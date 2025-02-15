import { createServerFeature } from '@payloadcms/richtext-lexical'

export const AI = createServerFeature({
  feature: {
    ClientFeature: '@/fields/ai/client#AIFeature',
    clientFeatureProps: null,
  },
  key: 'ai',
})
