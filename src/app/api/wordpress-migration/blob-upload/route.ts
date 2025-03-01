import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextRequest, NextResponse } from 'next/server'
import { getTenantFromCookie } from '@/utilities/getTenant'

export const runtime = 'edge'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const tenant = await getTenantFromCookie()

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant is required' }, { status: 400 })
    }

    const body = (await request.json()) as HandleUploadBody
    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
        // Add tenant-specific metadata and restrictions
        return {
          allowedContentTypes: ['application/sql', 'text/plain', 'application/octet-stream'],
          tokenPayload: JSON.stringify({
            tenantId: tenant.id,
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This callback is required by the type definition
        // It won't work on localhost, only in production
        console.log('SQL file upload completed', blob)

        try {
          if (tokenPayload) {
            const { tenantId } = JSON.parse(tokenPayload)
            console.log(`File uploaded for tenant ${tenantId}`)
            // You could store the blob URL in your database here if needed
          }
        } catch (error) {
          console.error('Post-upload processing error:', error)
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Error in blob upload:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
