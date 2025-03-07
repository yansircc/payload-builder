import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { getTenantFromCookie } from '@/utilities/getTenant'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    // Verify that the BLOB_READ_WRITE_TOKEN is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Vercel Blob is not configured. BLOB_READ_WRITE_TOKEN is missing.' },
        { status: 500 },
      )
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
        try {
          // Get tenant from cookie
          const tenant = await getTenantFromCookie()

          if (!tenant) {
            throw new Error('Tenant is required')
          }

          // For simplicity in this example, we're not doing strict authentication
          // In a production app, you should implement proper authentication here

          return {
            allowedContentTypes: ['application/sql', 'text/plain', 'application/octet-stream'],
            tokenPayload: JSON.stringify({
              tenantId: tenant.id,
            }),
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This won't work on localhost, only in production
        console.log('SQL file upload completed', blob)

        try {
          if (tokenPayload) {
            const { tenantId } = JSON.parse(tokenPayload)
            console.log(`File uploaded for tenant ${tenantId}`)
            // You could store the blob URL in your database here if needed
          }
        } catch (error) {
          console.error('Post-upload processing error:', error)
          throw new Error('Could not process uploaded file')
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Blob upload error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
