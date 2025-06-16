// src/components/company/RecommendedJobs.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobService';
import { Job } from '@/lib/types';
import { SectionTitle } from '@/component/common/SectionTitle';
import { JobCard } from '@/component/job/JobCard';
import { Loader2 } from 'lucide-react';

export function RecommendedJobs() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hanya fetch data jika pengguna sudah terotentikasi
    if (isAuthenticated()) {
      const fetchRecommendations = async () => {
        setIsLoading(true);
        const jobs = await jobService.getRecommendedJobs();
        setRecommendedJobs(jobs);
        setIsLoading(false);
      };
      fetchRecommendations();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Jangan render apapun jika tidak login atau sedang loading dan belum ada data
  if (!isAuthenticated() || recommendedJobs.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="mt-16">
      <SectionTitle
        title="Pekerjaan yang Direkomendasikan untuk Kamu"
        subtitle="Berdasarkan profil dan aktivitas Anda, kami menemukan peluang ini."
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}