"use client";
import { useRouter } from 'next/router';

// Define a Type for Job
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

interface JobCardProps {
  job: Job; // Explicitly define the type for the job prop
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-indigo-900">{job.title}</h3>
      <p className="mt-2 text-gray-500">{job.company}</p>
      <p className="mt-2 text-gray-400 text-sm">{job.location}</p>

      <div className="mt-4">
        <button
          onClick={() => router.push(`/jobs/${job.id}`)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
