import { headers } from 'next/headers'
import { getSiteSettingsFromDomain } from './getSiteSettings'

export interface CountryAccess {
  isAllowed: boolean
  country: string
}

const siteSettings = await getSiteSettingsFromDomain()
const BLOCKED_COUNTRIES = siteSettings?.blacklistCountries || ([] as const)
type BlockedCountry = (typeof BLOCKED_COUNTRIES)[number]

export function isBlockedCountry(country: string): country is BlockedCountry {
  return BLOCKED_COUNTRIES.includes(country as BlockedCountry)
}

export async function getCountryAccess(): Promise<CountryAccess> {
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country') || 'UNKNOWN'

  return {
    isAllowed: !isBlockedCountry(country),
    country,
  }
}
