'use client'

import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './custom.scss'
import Link from 'next/link'

const LoginPage: React.FC = () => {
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
    <div className="wrapper-outsides">
      <div className="form-wrapper">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <Loader2 />
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

        <div className="logo-section">
          <img src="https://shadcnblocks.com/images/block/block-1.svg" alt="logo" />
          <p>Shadcn Blocks</p>
        </div>

        <div className="welcome-text">
          <p>
            <b>Welcome to your dashboard!</b>
          </p>
          <p>This is where site admins will log in to manage your website.</p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="login__form__inputWrap">
              <div className="field-type email">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="field-type password">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <input id="password" name="password" type="password" required />
              </div>
              <Link href="/admin/forgot" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="form-submit">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            {/* hide for a while  */}
            {/* <button type="button" className="google-button">
              <FcGoogle />
              Sign up with Google
            </button> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
