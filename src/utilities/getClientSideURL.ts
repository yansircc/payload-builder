/**
 * Returns the base URL for client-side API requests
 *
 * @description This function returns the appropriate base URL for making API requests
 * from the client side, taking into account the current environment.
 *
 * @returns {string} The base URL for API requests
 */
export function getClientSideURL(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  // Use the current origin in the browser
  return window.location.origin
}
