'use client'

import { Button, Gutter } from '@payloadcms/ui'
import { upload } from '@vercel/blob/client'
import { AlertCircle, CheckCircle, Loader2, XCircle } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface MigrationResult {
  success: boolean
  id: string
  newId?: string
  error?: string
  skipped?: boolean
  existingId?: string
  message?: string
}

interface MigrationSummary {
  summary: boolean
  total: number
  success: number
  skipped: number
  errors: number
  results: MigrationResult[]
  message: string
}

export const DefaultRootViewClient = ({ user }: { user: any }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMigrating, setIsMigrating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [useVercelBlob, setUseVercelBlob] = useState(false)

  // Streaming state
  const [progress, setProgress] = useState(0)
  const [messages, setMessages] = useState<string[]>([])
  const [results, setResults] = useState<MigrationResult[]>([])
  const [summary, setSummary] = useState<MigrationSummary | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setBlobUrl(null)
      setMessages([])
      setResults([])
      setSummary(null)
      setProgress(0)
    }
  }, [])

  const processStreamingResponse = async (response: Response) => {
    if (!response.ok || !response.body) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
    }

    // Process the streaming response
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let processedPosts = 0
    let totalPosts = 0

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6))

            if (data.message) {
              setMessages((prev) => [...prev, data.message])

              // Extract total posts count if available
              const postsMatch = data.message.match(/Found (\d+) WordPress posts to process/)
              if (postsMatch && postsMatch[1]) {
                totalPosts = parseInt(postsMatch[1], 10)
              }
            }

            if (data.result) {
              if (data.result.summary) {
                // This is the final summary
                setSummary(data.result)
                setProgress(100)
              } else {
                // This is an individual result
                setResults((prev) => [...prev, data.result])

                // Update progress if we know the total
                if (totalPosts > 0) {
                  processedPosts++
                  setProgress(Math.round((processedPosts / totalPosts) * 100))
                }
              }
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e)
          }
        }
      }
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!file) {
      setError('Please select a SQL file')
      return
    }

    setIsLoading(true)
    setIsMigrating(true)
    setError(null)
    setMessages([])
    setResults([])
    setSummary(null)
    setProgress(0)

    try {
      if (useVercelBlob) {
        // Use Vercel Blob if selected
        setMessages((prev) => [...prev, 'Uploading file to Vercel Blob...'])

        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/wordpress-migration/blob-upload',
        })

        setBlobUrl(blob.url)
        setMessages((prev) => [...prev, 'File uploaded successfully to Vercel Blob'])

        // Send the blob URL to our API
        setMessages((prev) => [...prev, 'Starting migration process...'])
        const response = await fetch('/api/wordpress-migration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blobUrl: blob.url }),
        })

        await processStreamingResponse(response)
      } else {
        // Use direct upload
        const formData = new FormData()
        formData.append('file', file)

        setMessages((prev) => [...prev, 'Starting migration process...'])
        const response = await fetch('/api/wordpress-migration', {
          method: 'POST',
          body: formData,
        })

        await processStreamingResponse(response)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to migrate posts')
    } finally {
      setIsLoading(false)
      setIsMigrating(false)
    }
  }, [file, useVercelBlob])

  return (
    <Gutter>
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-8">WordPress Migration</h1>

        <div className="max-w-4xl">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <div className="space-y-6">
              {/* File Input */}
              <div>
                <label htmlFor="sql-file" className="block text-sm font-medium text-gray-700 mb-2">
                  Select WordPress SQL File
                </label>
                <input
                  type="file"
                  id="sql-file"
                  accept=".sql,.txt"
                  onChange={handleFileChange}
                  disabled={isLoading || isMigrating}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Upload your WordPress database SQL dump file
                </p>
              </div>

              {/* Vercel Blob Option */}
              <div className="flex items-center">
                <input
                  id="use-vercel-blob"
                  type="checkbox"
                  checked={useVercelBlob}
                  onChange={(e) => setUseVercelBlob(e.target.checked)}
                  disabled={isLoading || isMigrating}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="use-vercel-blob" className="ml-2 block text-sm text-gray-700">
                  Use Vercel Blob for large file support
                </label>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Recommended for files over 4MB
                </span>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  onClick={handleSubmit}
                  disabled={!file || isLoading || isMigrating}
                  className="w-full justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {useVercelBlob ? 'Uploading & Migrating...' : 'Migrating...'}
                    </>
                  ) : (
                    'Start Migration'
                  )}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">{error}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Migration Progress */}
          {isMigrating && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
              <h2 className="text-lg font-medium mb-4">Migration Progress</h2>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Log Messages */}
              {messages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Log Messages</h3>
                  <div className="border rounded-md p-3 bg-gray-50 h-40 overflow-y-auto text-sm">
                    {messages.map((message, index) => (
                      <div key={index} className="py-1">
                        {message}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Migration Results */}
          {results.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium mb-4">Migration Results</h2>

              {/* Summary */}
              {summary && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Posts: {summary.total}</span>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">{summary.success} successful</span>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{summary.skipped} skipped</span>
                      </div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">{summary.errors} failed</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results List */}
              <div className="border rounded-md overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-start p-3 border-b last:border-b-0">
                      <div className="flex-shrink-0 mr-3">
                        {result.success ? (
                          result.skipped ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{result.message}</p>
                        {result.error && (
                          <p className="text-xs text-red-600 mt-1">{result.error}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Gutter>
  )
}
