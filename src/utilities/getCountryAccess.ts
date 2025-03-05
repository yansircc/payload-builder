import { headers } from 'next/headers'
import { getSiteSettingsFromDomain } from './getSiteSettings'

export interface CountryAccess {
  isAllowed: boolean
  country: string
}

export function isBlockedCountry(country: string, blockedCountries: string[]): boolean {
  return blockedCountries.includes(country)
}

export async function getCountryAccess(): Promise<CountryAccess> {
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country') || 'UNKNOWN'

  // Get site settings with the headers
  const siteSettings = await getSiteSettingsFromDomain(headersList)
  const blockedCountries = siteSettings?.blacklistCountries || []

  return {
    isAllowed: !isBlockedCountry(country, blockedCountries),
    country,
  }
}
