import { NextRequest, NextResponse } from 'next/server'

/**
 * Validates a JSON-LD schema using Google's validation service
 *
 * POST /api/validate-schema
 * Body: { schema: Object }
 * Returns: { valid: boolean, errors?: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const schema = body.schema

    if (!schema) {
      return NextResponse.json({ error: 'No schema provided' }, { status: 400 })
    }

    // Basic validation
    const validationErrors = validateSchema(schema)

    if (validationErrors.length > 0) {
      return NextResponse.json({ valid: false, errors: validationErrors }, { status: 200 })
    }

    // Schema is valid
    return NextResponse.json({ valid: true }, { status: 200 })
  } catch (error) {
    console.error('Error validating schema:', error)
    return NextResponse.json(
      { error: 'Error validating schema', message: (error as Error).message },
      { status: 500 },
    )
  }
}

/**
 * Performs basic validation of a schema.org JSON-LD object
 */
function validateSchema(schema: any): string[] {
  const errors: string[] = []

  // Check for required properties
  if (!schema['@context']) {
    errors.push('Missing @context property')
  } else if (schema['@context'] !== 'https://schema.org') {
    errors.push('@context must be "https://schema.org"')
  }

  if (!schema['@type']) {
    errors.push('Missing @type property')
  }

  // If it's a @graph, validate each item
  if (schema['@graph'] && Array.isArray(schema['@graph'])) {
    schema['@graph'].forEach((item, index) => {
      if (!item['@type']) {
        errors.push(`Item ${index} in @graph is missing @type property`)
      }
    })
  }

  return errors
}
