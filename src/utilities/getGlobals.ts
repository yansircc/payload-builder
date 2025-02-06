import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { Config, Footer, Header } from 'src/payload-types'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

/**
 * Retrieves the footer global configuration with populated relationships
 * @returns The footer configuration with populated relationships
 */
export async function getFooter(depth = 2): Promise<Footer> {
  return getGlobal('footer', depth) as Promise<Footer>
}

/**
 * Retrieves the header global configuration with populated relationships
 * @returns The header configuration with populated relationships
 */
export async function getHeader(depth = 2): Promise<Header> {
  return getGlobal('header', depth) as Promise<Header>
}
