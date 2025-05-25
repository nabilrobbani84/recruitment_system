import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Menambahkan tipe untuk event parameter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic login di sini
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full md:w-96">
        <h2 className="text-3xl font-semibold text-center text-indigo-800 mb-6">Welcome Back!</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

