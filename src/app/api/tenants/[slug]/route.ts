import payload from 'payload'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json()

    // Find the tenant first
    const tenants = await payload.find({
      collection: 'tenants',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!tenants.docs.length) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    const tenant = tenants.docs[0]

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    // Update the tenant
    const updatedTenant = await payload.update({
      collection: 'tenants',
      id: tenant.id as string,
      data: {
        theme: body.theme,
      },
    })

    return NextResponse.json(updatedTenant)
  } catch (error) {
    console.error('Error updating tenant theme:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
