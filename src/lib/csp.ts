import crypto from 'crypto'
import { isProd } from './isProd'

/**
 * Uses Content-Security-Policy header and content for improved security
 * @param inlineScriptSource
 * @returns string
 */
export const getCsp = (inlineScriptSource: crypto.BinaryLike): string => {
  const csp = []
  const hash = crypto.createHash('sha256').update(inlineScriptSource)

  csp.push(`base-uri 'self'`)
  csp.push(`form-action 'self'`)
  csp.push(`default-src 'self'`)
  csp.push(
    `script-src 'self'${isProd ? '' : ` 'unsafe-eval'`} 'sha256-${hash.digest(
      'base64'
    )}'`
  )
  csp.push(`style-src 'self'${isProd ? '' : ` 'unsafe-inline'`}`)
  csp.push(`connect-src 'self' vitals.vercel-insights.com`)
  csp.push(`img-src 'self' data: blob:`)
  csp.push(`font-src 'self' data:`)
  csp.push(`frame-src *`)
  csp.push(`media-src *`)

  return csp.join('; ')
}
