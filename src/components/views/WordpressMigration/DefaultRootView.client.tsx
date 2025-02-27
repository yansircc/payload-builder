'use client'

import { Button, Gutter } from '@payloadcms/ui'
import React, { useCallback, useState } from 'react'

export const DefaultRootViewClient = ({ user }: { user: any }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setSuccess(null)
    }
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!file) {
      setError('Please select a SQL file')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/wordpress-migration', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to migrate posts')
      }

      const result = await response.json()
      setSuccess(`Successfully migrated ${result.count} posts`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to migrate posts')
    } finally {
      setIsLoading(false)
    }
  }, [file])

  return (
    <Gutter>
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-8">WordPress Migration</h1>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="space-y-6">
              {/* File Input */}
              <div>
                <label htmlFor="sql-file" className="block text-sm font-medium text-gray-700 mb-2">
                  Select WordPress SQL File
                </label>
                <input
                  type="file"
                  id="sql-file"
                  accept=".sql"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Upload your WordPress database SQL dump file
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  onClick={handleSubmit}
                  disabled={!file || isLoading}
                  className="w-full justify-center"
                >
                  {isLoading ? 'Migrating...' : 'Start Migration'}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Success</h3>
                      <div className="mt-2 text-sm text-green-700">{success}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Gutter>
  )
}
