"use client";  

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FaRegComment, FaBell } from 'react-icons/fa'; // Import ikon chat dan bell dari react-icons

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State untuk mengontrol dropdown notifikasi
  const router = useRouter(); 

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
            onClick={() => router.push('/Login')}
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

        {/* Chat Icon using React Icons */}
        <div className="hidden md:flex">
          <a href="/chat" className="flex items-center space-x-2 hover:text-green-500">
            <FaRegComment className="w-6 h-6 text-white" />
            <span className="hidden sm:block">Chat</span>
          </a>
        </div>

        {/* Notification Icon */}
        <div className="relative hidden md:flex">
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Toggle notification dropdown
            className="flex items-center space-x-2 hover:text-green-500"
          >
            <FaBell className="w-6 h-6 text-white" />
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute top-10 right-0 bg-indigo-800 text-white rounded-lg shadow-lg w-64 p-4">
              <p className="font-semibold text-lg">Notifikasi Baru</p>
              <ul className="mt-2 space-y-2">
                <li className="hover:bg-indigo-700 p-2 rounded">Pesan baru dari admin</li>
                <li className="hover:bg-indigo-700 p-2 rounded">Pembaruan lowongan pekerjaan</li>
                <li className="hover:bg-indigo-700 p-2 rounded">Reminder: Deadline besok</li>
              </ul>
            </div>
          )}
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
                onClick={() => router.push('/Login')}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
