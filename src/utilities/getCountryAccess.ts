import { headers } from 'next/headers'
import { getSiteSettingsFromDomain } from './getSiteSettings'

export interface CountryAccess {
  isAllowed: boolean
  country: string
}

export async function getCountryAccess(): Promise<CountryAccess> {
  const siteSettings = await getSiteSettingsFromDomain()
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country') || 'UNKNOWN'

  const BLOCKED_COUNTRIES = siteSettings?.blacklistCountries || ([] as const)
  type BlockedCountry = (typeof BLOCKED_COUNTRIES)[number]
  const isBlockedCountry = BLOCKED_COUNTRIES.includes(country as BlockedCountry)

  return {
    isAllowed: !isBlockedCountry,
    country,
  }
}
