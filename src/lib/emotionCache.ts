import createCache from '@emotion/cache'

/**
 * Creates an global emotion SSR cache
 * @returns emotion cache object
 */
export default function createEmotionCache() {
  return createCache({ key: 'css' })
}
