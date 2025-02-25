import { headers } from 'next/headers'

export interface CountryAccess {
  isAllowed: boolean
  country: string
}

const BLOCKED_COUNTRIES = ['RU', 'BY', 'IR', 'KP'] as const
type BlockedCountry = (typeof BLOCKED_COUNTRIES)[number]

export function isBlockedCountry(country: string): country is BlockedCountry {
  return BLOCKED_COUNTRIES.includes(country as BlockedCountry)
}

export async function getCountryAccess(): Promise<CountryAccess> {
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country') || 'UNKNOWN'

  return {
    isAllowed: false,
    country,
  }
}
