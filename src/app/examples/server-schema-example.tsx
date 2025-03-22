import SchemaJsonLd from '@/components/SchemaMarkup'
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

  // Return the schema with SchemaJsonLd component
  return <SchemaJsonLd item={organizationSchema} />

  // For multiple schemas, use combineSchemas:
  // const schemas = [
  //   generateOrganizationSchema(options),
  //   // Add other schemas here
  // ]
  // return <SchemaJsonLd item={combineSchemas(schemas)} />
}
