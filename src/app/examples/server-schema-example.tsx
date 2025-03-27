import SchemaOrganizer from '@/components/SchemaOrganizer'
import type { SiteSetting } from '@/payload-types'
import { generateOrganizationSchema } from '@/utilities/schema'

interface ServerSchemaExampleProps {
  siteSettings: SiteSetting
}

export default function ServerSchemaExample({ siteSettings }: ServerSchemaExampleProps) {
  // Get base URL from environment variables
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  // Create schema options
  const options = {
    siteSettings,
    baseUrl,
  }

  // Generate organization schema
  const organizationSchema = generateOrganizationSchema(options)

  // For a single schema, we still use SchemaOrganizer for consistent API
  return <SchemaOrganizer items={[organizationSchema]} baseUrl={baseUrl} />

  // For multiple schemas, use this pattern:
  // const schemas = [
  //   generateOrganizationSchema(options),
  //   // Add other schemas here
  // ]
  // return <SchemaOrganizer items={schemas} baseUrl={baseUrl} />
}
