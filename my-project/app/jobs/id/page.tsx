import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getJobDetails } from '../../utils/api'

const JobDetailsPage = () => {
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return

      try {
        const data = await getJobDetails(Number(id))
        setJob(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch job details.')
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [id])

  if (loading) return <div>Loading...</div>

  if (error) return <div>{error}</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Job Details</h2>

      {job && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-indigo-900">{job.title}</h3>
          <p className="mt-2 text-gray-500">{job.company}</p>
          <p className="mt-2 text-gray-400 text-sm">{job.location}</p>

          <div className="mt-6">
            <h4 className="font-semibold">Job Description</h4>
            <p>{job.description}</p>
          </div>

          <div className="mt-6">
            <a href={`/jobs/apply/${job.id}`} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Apply Now
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetailsPage
