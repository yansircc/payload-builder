// storage-adapter-import-placeholder
import path from 'path'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { en } from '@payloadcms/translations/languages/en'
import { zh } from '@payloadcms/translations/languages/zh'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp' // sharp-import
import { env } from '@/env'
import { defaultLexical } from '@/fields/defaultLexical'
import { Banner } from './blocks/Banner/config'
import { Categories } from './collections/Categories'
import { CustomCodes } from './collections/CustomCodes'
import { ErrorLogs } from './collections/ErrorLogs'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Popups } from './collections/Popups'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Services } from './collections/Services'
import { SiteSettings } from './collections/SiteSetting'
import { Tenants } from './collections/Tenants'
import Users from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import Widgets from './globals/Widget/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: { fallbackLanguage: 'en', supportedLanguages: { en, zh } },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
      views: {
        WordpressMigrationView: {
          Component: '@/components/views/WordpressMigration/DefaultRootView#DefaultRootView',
          path: '/wordpress-migration',
        },
      },
      afterNavLinks: ['@/components/Nav/WordpressMigration'],
    },
    importMap: { baseDir: path.resolve(dirname) },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({ url: env.DATABASE_URL || false }),
  blocks: [Banner],
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Tenants,
    Header,
    Footer,
    CustomCodes,
    Popups,
    SiteSettings,
    ErrorLogs,
    Services,
    Products,
    Widgets,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
