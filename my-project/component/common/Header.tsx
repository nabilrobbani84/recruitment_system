"use client"; // This makes the component a client-side component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FaRegComment, FaBell, FaGlobe } from 'react-icons/fa'; // Import icons from react-icons

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for notifications dropdown
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // State for language dropdown
  const [selectedLanguage, setSelectedLanguage] = useState('ID'); // State for selected language
  const router = useRouter(); 

  // Language change function
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false); // Close dropdown after selecting language
    // You can add logic to change the app's language here
  };

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

        {/* Language Selection Dropdown */}
        <div className="relative hidden md:flex items-center space-x-2">
          <button 
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} // Toggle language dropdown
            className="flex items-center space-x-2 hover:text-green-500"
          >
            <FaGlobe className="w-6 h-6 text-white" /> {/* Globe Icon */}
            <span className="ml-2 text-white">{selectedLanguage === 'ID' ? 'Bahasa' : 'English'}</span>
          </button>

          {/* Language Dropdown */}
          {isLanguageDropdownOpen && (
            <div className="absolute top-10 right-0 bg-indigo-800 text-white rounded-lg shadow-lg w-40 p-4">
              <ul className="space-y-2">
                <li 
                  className="hover:bg-indigo-700 p-2 rounded cursor-pointer"
                  onClick={() => handleLanguageChange('ID')}
                >
                  Bahasa Indonesia
                </li>
                <li 
                  className="hover:bg-indigo-700 p-2 rounded cursor-pointer"
                  onClick={() => handleLanguageChange('EN')}
                >
                  English
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Icons (Chat & Notifications) */}
        <div className="flex items-center space-x-4">
          {/* Chat Icon */}
          <a href="/chat" className="flex items-center space-x-2 hover:text-green-500">
            <FaRegComment className="w-6 h-6 text-white" />
            <span className="hidden sm:block">Chat</span>
          </a>

          {/* Notification Icon */}
          <div className="relative">
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

          {/* Login Button */}
          <div className="hidden md:flex">
            <button 
              onClick={() => router.push('pages/login')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Login
            </button>
          </div>
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
                onClick={() => router.push('/auth/login')}
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
