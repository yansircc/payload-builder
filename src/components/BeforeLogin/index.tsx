'use client'

import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './index.scss'
import Link from 'next/link'

const BeforeLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (error) {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        window.location.href = '/admin'
      } else {
        setError(data.errors?.[0]?.message || data.message || 'Login failed')
        setIsLoading(false)
      }
    } catch (error) {
      setError('System error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center relative">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <Loader2 className="h-8 w-8 text-white" />
            <span>Logging in...</span>
          </div>
        </div>
      )}

      {showToast && error && (
        <div className="toast-message">
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        </div>
      )}
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
      <div className="w-full max-w-md px-8 py-12 bg-[#1a1a1a] rounded-lg shadow-md border border-gray-700 form-fade-in">
        <form onSubmit={handleSubmit} className="form">
          <div className="login__form__inputWrap">
            <div className="field-type email">
              <label htmlFor="email" className="block text-sm font-medium field-label">
                Email <span className="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block h-12 w-full rounded-md border border-gray-500 bg-gray-900 px-4 text-white focus:border-white focus:ring-white focus:outline-none"
              />
            </div>
            <div className="field-type password">
              <label htmlFor="password" className="block text-sm font-medium field-label">
                Password <span className="required">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block h-12 w-full rounded-md border border-gray-500 bg-gray-900 px-4 text-white focus:border-white focus:ring-white focus:outline-none"
              />
            </div>
            <Link href="/admin/forgot" className="text-gray-300 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="form-submit">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn--icon-style-without-border btn--size-large btn--withoutPopup btn--style-primary btn--withoutPopup"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BeforeLogin
