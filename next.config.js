/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material',
])

const packageJson = require('./package.json')
const date = new Date()
const isProduction = process.env.NODE_ENV === 'production'

/**
 * A headers function to
 * @returns A JSON structured security policy header
 */
const headers = async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ]
}

const nextJSConfig = {
  env: {
    BUILD_TIME: date.toString(),
    BUILD_TIMESTAMP: +date,
    APP_NAME: packageJson.name,
    APP_VERSION: packageJson.version,
  },
  pwa: {
    disable: isProduction ? false : true,
    dest: 'public',
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  headers,
  // experimental: {
  //   concurrentFeatures: true,
  // },
  webpack: (config, { isServer, buildId }) => {
    const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`

    if (isServer) {
      // Trick to only log once
      console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}"`)
    }

    return config
  },
  reactStrictMode: true,
  excludeFile: (str) => /\*.{spec,test}.(js,ts,tsx)/.test(str),
}

/**
 * Export the NextJS App with PWA Capabilities
 */
module.exports = withPlugins([withPWA, withTM], nextJSConfig)
