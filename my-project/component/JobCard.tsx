// src/components/job/JobCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/lib/types';
import { MapPin, Briefcase, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  // Fungsi untuk memformat waktu (misal: "Diposting 2 hari lalu")
  const timeAgo = (dateString: string) => {
    // Implementasi sederhana, bisa diganti dengan library seperti date-fns
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    return "Hari ini";
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
        <div className="flex items-start gap-4">
          <Image
            src={job.companyLogo}
            alt={`${job.companyName} logo`}
            width={48}
            height={48}
            className="rounded-md object-contain flex-shrink-0"
          />
          <div className="flex-grow">
            <p className="text-sm font-semibold text-blue-600">{job.companyName}</p>
            <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-blue-700">{job.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Briefcase size={14} />{job.type}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{timeAgo(job.postedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}