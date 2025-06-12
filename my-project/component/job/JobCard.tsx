import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Job } from '@/lib/types';
// Impor 'Clock' sekarang akan digunakan
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { CategoryChip } from './CategoryChip';

// Helper function untuk format "time ago" (bisa dipindah ke file utils)
const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit lalu";
  return Math.floor(seconds) + " detik lalu";
};

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Image
            src={job.companyLogo || '/images/default-logo.png'}
            alt={`${job.companyName} logo`}
            width={48}
            height={48}
            className="rounded-md object-contain"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              <Link href={`/jobs/${job.id}`} className="stretched-link">
                {job.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600">{job.companyName}</p>
          </div>
        </div>

        {/* Info Tambahan (BAGIAN YANG DIPERBAIKI) */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
          <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.type}</span>
          {/* Menambahkan informasi waktu posting menggunakan ikon Clock */}
          <span className="flex items-center gap-1.5"><Clock size={14} /> {timeAgo(job.postedAt)}</span>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          {truncateText(job.description, 100)}
        </p>
      </div>
      
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
        <div className="w-0 flex-1 flex items-center justify-between p-4">
           <CategoryChip category={job.category} />
           <span className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
              Lihat Detail <ArrowRight size={14} className="inline-block" />
           </span>
        </div>
      </div>
    </div>
  );
};