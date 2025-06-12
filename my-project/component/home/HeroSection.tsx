import React from 'react';
import { Button } from '@/component/common/Button';
import { SearchBar } from '@/component/common/SearchBar'; // Asumsi SearchBar sudah ada
import { MapPin, Search } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative bg-blue-50">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Teks */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Temukan <span className="text-blue-600">Pekerjaan Impian</span> Anda Berikutnya.
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Jelajahi ribuan lowongan pekerjaan dari perusahaan-perusahaan terkemuka di Indonesia. Mulai karir Anda bersama kami.
            </p>

            {/* Form Pencarian */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
              <input 
                type="text" 
                placeholder="Jabatan atau kata kunci" 
                className="w-full h-12 px-4 border border-gray-200 rounded-md focus:ring-blue-500 focus:outline-none"
              />
               <input 
                type="text" 
                placeholder="Lokasi" 
                className="w-full md:w-auto h-12 px-4 border border-gray-200 rounded-md focus:ring-blue-500 focus:outline-none"
              />
              <Button size="lg" className="w-full md:w-auto flex-shrink-0">
                <Search size={20} className="mr-2"/> Cari
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Contoh: Software Engineer, Marketing, Jakarta, BUMN...
            </p>
          </div>
          
          {/* Kolom Gambar */}
          <div className="hidden md:block">
            <img 
              src="/images/hero-illustration.png" // Ganti dengan path gambar Anda
              alt="Ilustrasi orang sedang mencari pekerjaan"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};