import React, { useState } from 'react'
import { useRouter } from 'next/router'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate the email
    if (!email) {
      setError('Email is required!')
      setIsSubmitting(false)
      return
    }

    // Simulate password reset process
    setTimeout(() => {
      if (email === 'test@domain.com') {
        setError('This email is not registered!')
      } else {
        setSuccessMessage('If this email is registered, we will send a reset link shortly.')
        setEmail('')
      }
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">Forgot Password</h2>

        {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-3 mb-4 rounded">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Remembered your password?{' '}
            <button
              onClick={() => router.push('/auth/login')}
              className="text-indigo-600 hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
