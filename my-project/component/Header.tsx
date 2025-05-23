"use client"; // This ensures that the component is a client-side component

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="bg-indigo-900 text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-2xl font-semibold cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-green-500">Recruit</span>Easy
        </div>

        {/* Navbar Links for Desktop */}
        <nav className="hidden md:flex space-x-8">
          <a href="/jobs" className="hover:text-green-500">Lowongan Kerja</a>
          <a href="/about" className="hover:text-green-500">Perusahaan</a>
          <a href="/blog" className="hover:text-green-500">Blog</a>
          <a href="/help" className="hover:text-green-500">Help Center</a>
        </nav>

        {/* Login Button */}
        <div className="hidden md:flex">
          <button 
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 text-white py-4 px-6">
          <nav className="space-y-4">
            <a href="/jobs" className="block hover:text-green-500">Lowongan Kerja</a>
            <a href="/about" className="block hover:text-green-500">Perusahaan</a>
            <a href="/blog" className="block hover:text-green-500">Blog</a>
            <a href="/help" className="block hover:text-green-500">Help Center</a>
            <div className="mt-4">
              <button 
                onClick={() => router.push('/login')}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
