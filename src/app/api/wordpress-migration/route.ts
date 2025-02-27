import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'
import { getTenantFromCookie } from '@/utilities/getTenant'
import { WordPressMigrationService } from './migration-service'

export async function POST(req: NextRequest) {
  try {
    const tenant = await getTenantFromCookie()

    if (!tenant) {
      return new Response('Tenant is required', { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const migrationService = new WordPressMigrationService(payload, tenant.id)

    // Handle file upload
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return new Response('SQL file is required', { status: 400 })
    }

    // Read the file content
    const sqlContent = await file.text()

    if (!sqlContent) {
      return new Response('SQL content is empty', { status: 400 })
    }

    const result = await migrationService.migrateFromSQL(sqlContent)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    const error = err as Error
    console.error('Migration error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
