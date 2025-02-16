import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getRedirects(depth = 1, tenantId: string) {
  const payload = await getPayload({ config: configPromise })

  if (!tenantId) return

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    where: {
      tenant: {
        equals: tenantId,
      },
    },
    depth,
    limit: 0,
    pagination: false,
  })

  return redirects
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
// export const getCachedRedirects = () =>
//   unstable_cache(async () => getRedirects(), ['redirects'], {
//     tags: ['redirects'],
//   })
