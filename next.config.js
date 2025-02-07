import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'
import { env } from './src/env.js'

// Get __filename in ES modules
const __filename = fileURLToPath(import.meta.url)

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
          pathname: '**',
        }
      }),
      {
        hostname: '*.localhost.com',
        protocol: 'http',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  redirects,
  async rewrites() {
    return [
      {
        source: '/((?!admin|api))tenant-domains/:path*',
        destination: '/tenant-domains/:tenant/:path*',
        has: [
          {
            type: 'host',
            value: '(?<tenant>.*)',
          },
        ],
      },
    ]
  },

  experimental: {
    reactCompiler: true,
    swcPlugins: [],
    optimizePackageImports: [
      '@payloadcms/next',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-navigation-menu',
      'framer-motion',
      'class-variance-authority',
      'tailwind-merge',
      'clsx',
    ],
    webpackBuildWorker: true,
  },

  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole:
      env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  output: 'standalone',

  poweredByHeader: false,
  compress: true,
  generateEtags: true,
}

export default withPayload(nextConfig)
