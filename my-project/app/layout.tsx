import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/component/common/Header';
import Footer from '@/component/common/Footer';
import AuthInterceptorSetup from "@/component/common/AuthInterceptorSetup";
import Providers from './provider'; // 1. Impor komponen Providers utama kita

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
        {/* 2. Bungkus semua konten dengan <Providers> */}
        <Providers>
            {/* AuthInterceptorSetup kemungkinan besar butuh AuthContext, 
              jadi letakkan di dalam <Providers> juga.
            */}
            <AuthInterceptorSetup />
            
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
        </Providers>
      </body>
    </html>
  );
}