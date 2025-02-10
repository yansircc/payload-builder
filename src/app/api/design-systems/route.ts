import payload, { CollectionSlug } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const tenant = searchParams.get('tenant')
    const isActive = searchParams.get('where[isActive][equals]')

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    const designSystems = await payload.find({
      collection: 'design-system' as CollectionSlug,
      where: {
        and: [
          {
            tenant: {
              equals: tenant,
            },
          },
          isActive
            ? {
                isActive: {
                  equals: isActive === 'true',
                },
              }
            : {},
        ],
      },
    })

    return NextResponse.json(designSystems)
  } catch (error) {
    console.error('Error fetching design systems:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
