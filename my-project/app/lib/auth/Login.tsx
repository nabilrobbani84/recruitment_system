"use client"; // Menandakan bahwa ini adalah client-side component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../../lib/auth/firebase'; // Mengimpor Firebase auth
import Image from 'next/image'; // Import Image component for Google logo

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Both email and password are required!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Login using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      setError('Invalid credentials');
    }

    setIsSubmitting(false);
  };

  // Google Login function
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        router.push('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      setError('Google login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{' '}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Google login button with Google logo */}
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
          >
            <Image 
              src="/google.png" // Provide the correct path to the Google logo image
              alt="Google Logo"
              width={24}
              height={24}
              className="mr-3"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
