// src/app/jobs/page.tsx

import { jobService, GetJobsParams } from '@/services/jobService';
import { JobCard } from '@/component/job/JobCard';
import { JobFilter } from '@/component/job/JobFilter';
import { Pagination } from '@/component/common/Pagination';

// Next.js secara otomatis memberikan searchParams ke komponen halaman server
interface JobsPageProps {
  searchParams: GetJobsParams;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  // Ambil data dari server berdasarkan parameter URL
  const { jobs, totalJobs, totalPages, currentPage } = await jobService.getJobs(searchParams);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Temukan Lowongan Pekerjaan</h1>
          <p className="mt-2 text-lg text-gray-600">Jelajahi ribuan peluang karir dari perusahaan terkemuka.</p>
        </div>

        {/* Komponen Filter (Client Component) */}
        <JobFilter />

        {/* Hasil Pencarian */}
        <section>
          {jobs.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                Menampilkan <span className="font-bold">{jobs.length}</span> dari <span className="font-bold">{totalJobs}</span> lowongan pekerjaan.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <h3 className="text-2xl font-bold text-gray-800">Tidak Ada Lowongan Ditemukan</h3>
              <p className="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau filter Anda.</p>
            </div>
          )}
        </section>

        {/* Komponen Paginasi (Client Component) */}
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </main>
  );
}