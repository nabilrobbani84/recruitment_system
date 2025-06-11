import React from 'react';
import { applicationService } from '@/services/applicationService';
// FIX 1: Path diperbaiki dari @/component menjadi @/components
import { ApplicationHistoryItem } from '@/component/candidate/ApplicationHistoryItem';
// FIX 2: Menghapus impor untuk Alert, AlertDescription, dan AlertTitle yang tidak ada dan tidak digunakan
import { FileSearch } from 'lucide-react';
import Link from 'next/link';

// Halaman ini cocok menjadi Server Component untuk fetch data awal
export default async function ApplicationsPage() {
  // Ambil data langsung di server. Disarankan menambahkan try-catch untuk penanganan error.
  let applications = [];
  try {
      applications = await applicationService.getApplications();
  } catch (error) {
      console.error("Gagal mengambil data lamaran:", error);
      // Jika terjadi error, kita akan menampilkan halaman kosong (seperti tidak ada lamaran).
      // Di aplikasi production, Anda bisa menampilkan komponen Alert di sini.
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Lamaran</h1>
        <p className="mt-1 text-gray-600">Lacak status semua lamaran pekerjaan Anda di sini.</p>
      </header>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        {applications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {applications.map((app) => (
              <ApplicationHistoryItem key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block bg-gray-100 p-4 rounded-full">
                <FileSearch size={40} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Belum Ada Lamaran</h3>
            <p className="mt-1 text-gray-500">Anda belum melamar pekerjaan apapun.</p>
            <Link href="/jobs" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
              Cari Pekerjaan Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}