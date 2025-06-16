// src/app/companies/page.tsx

import { companyService, GetCompaniesParams } from '@/services/companyService';
import { jobService } from '@/services/jobService'; // Impor jobService
import { CompanyCard } from '@/component/company/CompanyCard';
import { JobCard } from '@/component/job/JobCard'; // Impor JobCard
import { SearchBar } from '@/component/common/SearchBar';
import { Pagination } from '@/component/common/Pagination';
import { SectionTitle } from '@/component/common/SectionTitle';
import { RecommendedJobs } from '@/component/company/RecommendedJobs'; // Impor komponen baru

interface CompaniesPageProps {
  searchParams: GetCompaniesParams;
}

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
  // Ambil data perusahaan dan data IT jobs secara paralel untuk performa lebih baik
  const [companyData, itJobs] = await Promise.all([
    companyService.getCompanies(searchParams),
    jobService.getFeaturedJobs({ category: 'it', limit: 4 })
  ]);

  const { companies, totalCompanies, totalPages, currentPage } = companyData;

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Temukan Perusahaan Impian Anda</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Jelajahi profil perusahaan-perusahaan inovatif dan temukan budaya kerja yang cocok untuk Anda.
          </p>
        </div>

        <SearchBar placeholder="Cari nama perusahaan..." basePath="/companies" />

        {/* Bagian Daftar Perusahaan yang Sudah Ada */}
        <section>
          {companies.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Menampilkan <span className="font-bold">{totalCompanies}</span> perusahaan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {companies.map(company => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border">
              <h3 className="text-2xl font-bold text-gray-800">Perusahaan Tidak Ditemukan</h3>
              <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </section>

        <Pagination totalPages={totalPages} currentPage={currentPage} />

        {/* --- PENAMBAHAN BAGIAN BARU --- */}

        {/* 1. Lowongan IT di Berbagai Perusahaan */}
        {itJobs.length > 0 && (
          <section className="mt-16">
            <SectionTitle
              title="Lowongan IT di Berbagai Perusahaan"
              subtitle="Peluang teratas di bidang teknologi menanti Anda."
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {itJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        {/* 2. Pekerjaan yang Direkomendasikan (Client Component) */}
        <RecommendedJobs />
        
      </div>
    </main>
  );
}