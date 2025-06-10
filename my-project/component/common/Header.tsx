"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ini sudah benar untuk App Router
import { FaRegComment, FaBell, FaGlobe, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ID');
  const router = useRouter();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
    // Logika untuk mengubah bahasa aplikasi bisa ditambahkan di sini
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToLogin = () => {
    router.push('/login'); // Path yang benar untuk src/app/(auth)/login/page.tsx
    if (isMenuOpen) { // Jika menu mobile terbuka, tutup setelah navigasi
        setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-indigo-900 text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-2xl font-semibold cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-green-500">Recruit</span>Easy
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Navbar Links for Desktop */}
        <nav className="hidden md:flex space-x-8">
          <a href="/jobs" className="hover:text-green-500">Lowongan Kerja</a>
          {/* Asumsi Anda punya halaman /companies untuk "Perusahaan" */}
          <a href="/companies" className="hover:text-green-500">Perusahaan</a>
          {/* <a href="/blog" className="hover:text-green-500">Blog</a>
          <a href="/help" className="hover:text-green-500">Help Center</a> */}
        </nav>

        {/* Container untuk item-item di kanan pada tampilan desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Selection Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-2 hover:text-green-500"
            >
              <FaGlobe className="w-6 h-6 text-white" />
              <span className="ml-2 text-white">{selectedLanguage === 'ID' ? 'Bahasa' : 'English'}</span>
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute top-10 right-0 bg-indigo-800 text-white rounded-lg shadow-lg w-40 p-4 z-10">
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

          {/* Icons (Chat & Notifications) - Sesuaikan path jika perlu */}
          <div className="flex items-center space-x-4">
            <a href="/chat" className="flex items-center space-x-2 hover:text-green-500">
              <FaRegComment className="w-6 h-6 text-white" />
              <span className="hidden sm:block">Chat</span>
            </a>
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="flex items-center space-x-2 hover:text-green-500"
              >
                <FaBell className="w-6 h-6 text-white" />
              </button>
              {isNotificationOpen && (
                <div className="absolute top-10 right-0 bg-indigo-800 text-white rounded-lg shadow-lg w-64 p-4 z-10">
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

          {/* Login Button (Desktop) */}
          <div>
            <button
              onClick={navigateToLogin} // Ganti ke fungsi navigasi
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 text-white py-4 px-6">
          <nav className="space-y-4">
            <a href="/jobs" className="block hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Lowongan Kerja</a>
            <a href="/companies" className="block hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Perusahaan</a>
            {/* <a href="/blog" className="block hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Blog</a>
            <a href="/help" className="block hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Help Center</a> */}
            
            <div className="mt-4 border-t border-indigo-700 pt-4">
                <button
                    onClick={() => { handleLanguageChange('ID'); }}
                    className={`w-full text-left p-2 rounded ${selectedLanguage === 'ID' ? 'bg-indigo-700' : ''} hover:bg-indigo-600`}
                >
                    Bahasa Indonesia
                </button>
                <button
                    onClick={() => { handleLanguageChange('EN'); }}
                    className={`w-full text-left p-2 rounded ${selectedLanguage === 'EN' ? 'bg-indigo-700' : ''} hover:bg-indigo-600 mt-2`}
                >
                    English
                </button>
            </div>

            {/* Login Button (Mobile) */}
            <div className="mt-4">
              <button
                onClick={navigateToLogin} // Ganti ke fungsi navigasi
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