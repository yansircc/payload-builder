import payload from 'payload'
import { NextResponse } from 'next/server'

declare global {
  // eslint-disable-next-line no-var
  var __dbInitialized: boolean
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const whereParam = searchParams.get('where')

    if (!whereParam) {
      return NextResponse.json({ error: 'Missing where parameter' }, { status: 400 })
    }

    let whereObj
    try {
      whereObj = JSON.parse(whereParam)
    } catch (e) {
      return NextResponse.json({ error: 'Invalid where parameter' }, { status: 400 })
    }

    console.log('Available collections:', Object.keys(payload.collections))
    console.log('Querying tenants with where:', whereObj)

    try {
      const tenants = await payload.find({
        collection: 'tenants',
        where: whereObj,
      })
      console.log('Found tenants:', tenants)

      return NextResponse.json(tenants)
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        {
          error: 'Database error',
          details: dbError instanceof Error ? dbError.message : 'Unknown error',
          collections: Object.keys(payload.collections),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
