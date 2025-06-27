// src/app/jobs/page.tsx

// --- PERBAIKAN: Mengimpor semua dependensi dengan path dan tipe yang benar ---
import { getAllJobs, type IJob, type IPaginationMeta } from '@/services/jobService';
import JobList from '@/component/job/JobList'; // Path diperbaiki: components
import { Pagination } from '@/component/common/Pagination'; // Path diperbaiki: components
import { Alert } from '@/component/ui/Alert'; // Path diperbaiki: components/ui
import JobFilter from '@/component/job/JobFilter'; // Impor default dan path diperbaiki

// Props untuk SearchParams (filter, pagination, dll.)
interface JobsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * Fungsi ini adalah Server Component utama untuk halaman daftar pekerjaan.
 * Ia bertanggung jawab atas:
 * 1. Membaca parameter pencarian dari URL (untuk filter dan pagination).
 * 2. Mengambil data pekerjaan dari service API.
 * 3. Menangani kondisi loading dan error.
 * 4. Meneruskan data yang relevan ke komponen anak yang lebih "bodoh" (presentational).
 */
export default async function JobsPage({ searchParams }: JobsPageProps) {
  // Mengambil parameter dari URL dengan nilai default yang aman
  const currentPage = Number(searchParams.page) || 1;
  const keyword = searchParams.keyword as string | undefined;
  const location = searchParams.location as string | undefined;
  const type = searchParams.type as string | undefined;

  let jobs: IJob[] = [];
  let paginationMeta: IPaginationMeta | null = null;
  let fetchError: string | null = null;

  // Blok try...catch untuk menangani error saat pengambilan data API
  try {
    const response = await getAllJobs({
      page: currentPage,
      keyword,
      location,
      type,
    });
    jobs = response.data;
    paginationMeta = response.meta;
  } catch (error) {
    console.error("JobsPage Fetch Error:", error);
    fetchError = "Gagal memuat data lowongan. Silakan coba beberapa saat lagi.";
  }

  return (
    <main className="container mx-auto py-8 lg:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Temukan Pekerjaan Impian Anda</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Jelajahi ribuan lowongan dari berbagai perusahaan ternama di seluruh Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Kolom Filter */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filter Pencarian</h2>
            {/* Komponen filter menerima nilai awal dari searchParams */}
            <JobFilter initialFilters={{ keyword, location, type }} />
          </div>
        </aside>

        {/* Kolom Hasil Pekerjaan */}
        <section className="lg:col-span-3">
          {fetchError ? (
            // --- PERBAIKAN: Menggunakan variant "destructive" untuk error ---
            <Alert variant="destructive" title="Terjadi Kesalahan Server" message={fetchError} />
          ) : (
            <>
              {/* Memberikan prop `jobs` yang sudah dijamin berupa array ke JobList */}
              <JobList jobs={jobs} />

              {/* Logika untuk menampilkan pagination hanya jika diperlukan */}
              {paginationMeta && paginationMeta.totalPages > 1 && (
                <div className="mt-10">
                  <Pagination 
                    currentPage={paginationMeta.currentPage} 
                    totalPages={paginationMeta.totalPages} 
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
