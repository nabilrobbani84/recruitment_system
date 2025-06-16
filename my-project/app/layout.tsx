// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Asumsi ini adalah file CSS global Anda dari styles/globals.css

// 1. Impor komponen Header dan Footer
import Header from '@/component/common/Header';
import Footer from '@/component/common/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recruiteasy - Temukan Pekerjaan Impian Anda',
  description: 'Platform untuk mencari lowongan pekerjaan dari perusahaan terkemuka di Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* 2. Render Header di bagian atas */}
          <Header />
          
          {/* 3. Render konten halaman di dalam tag <main> */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* 4. Render Footer di bagian bawah */}
          <Footer />
        </div>
      </body>
    </html>
  );
}