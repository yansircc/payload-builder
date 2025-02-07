import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1),
    NEXT_PUBLIC_SERVER_URL: z.string().url(),
    CRON_SECRET: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().url(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    CRON_SECRET: process.env.CRON_SECRET,
  },

  skipValidation:
    !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === 'development',
})
