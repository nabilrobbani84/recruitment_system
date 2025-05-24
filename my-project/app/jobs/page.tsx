"use client";
import {useState } from 'react'
import Link from 'next/link'

type Job = {
  id: number
  title: string
  company: string
  location: string
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulated API response (mock data)
        const data: Job[] = [
          { id: 1, title: "Software Developer", company: "ABC Corp", location: "New York" },
          { id: 2, title: "UI/UX Designer", company: "XYZ Ltd", location: "San Francisco" }
        ]
        setJobs(data)
        setLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message) // Error handling with proper message
        } else {
          setError('An unknown error occurred')
        }
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Daftar Lowongan Kerja</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-indigo-900">{job.title}</h3>
            <p className="mt-2 text-gray-500">{job.company}</p>
            <p className="mt-2 text-gray-400 text-sm">{job.location}</p>

            <div className="mt-4">
              <Link href={`/jobs/${job.id}`}>
                <a className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full text-center block">
                  Lihat Detail
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobsPage
