import config from '@payload-config'
import { getPayload } from 'payload'
import { processAIRequest } from '@/utilities/ai'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(req: Request): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    const body = await req.json()
    const { prompt, option, command } = body

    if (!prompt || !option) {
      return new Response(
        JSON.stringify({
          message: 'Missing required fields: prompt and option are required',
        }),
        { status: 400 },
      )
    }

    const ip = req.headers.get('x-forwarded-for')

    const completion = await processAIRequest({
      prompt,
      option,
      command,
      ip: ip as string,
    })

    // Set up streaming response headers
    const headers = new Headers({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`),
              )
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, { headers })
  } catch (error) {
    console.error('AI Request Error:', error)

    // Check if it's a rate limit error
    if (error instanceof Error && error.message.includes('rate limit')) {
      const rateLimit = JSON.parse(error.message)
      return new Response(
        JSON.stringify({
          message: rateLimit.message,
          limit: rateLimit.limit,
          remaining: rateLimit.remaining,
          reset: rateLimit.reset,
        }),
        { status: 429 },
      )
    }

    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      { status: 500 },
    )
  }
}
