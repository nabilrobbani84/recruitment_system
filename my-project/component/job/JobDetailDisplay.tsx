import React from 'react';
import { Job } from '@/lib/types';
import { Button } from '@/component/common/Button';
import { Briefcase, MapPin, Building, CheckSquare } from 'lucide-react';
import Image from 'next/image';

interface JobDetailDisplayProps {
  job: Job;
  onApplyClick: () => void;
}

export const JobDetailDisplay: React.FC<JobDetailDisplayProps> = ({ job, onApplyClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">
              {job.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="mt-2 flex items-center gap-4 text-gray-600">
               <span className="flex items-center gap-1.5"><Building size={16} /> {job.companyName}</span>
               <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
               <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.type}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button size="lg" onClick={onApplyClick}>Lamar Sekarang</Button>
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="p-6 md:p-8 prose prose-blue max-w-none">
        <section>
          <h2 className="text-xl font-semibold mb-3">Deskripsi Pekerjaan</h2>
          <p>{job.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Kualifikasi</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckSquare size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};