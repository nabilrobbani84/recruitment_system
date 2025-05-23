import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// Menentukan tipe untuk Job
interface Job {
  id: number
  title: string
  company: string
}

const JobList = () => {
  const dispatch = useDispatch()
  const jobs = useSelector((state: RootState) => state.jobs) // Mengakses state jobs dari Redux

  const fetchJobs = () => {
    // Simulasi pengambilan data lowongan pekerjaan
    const jobData: Job[] = [
      { id: 1, title: 'Software Developer', company: 'ABC Corp' },
      { id: 2, title: 'UI/UX Designer', company: 'XYZ Ltd' },
    ]
    dispatch({ type: 'SET_JOBS', payload: jobData }) // Mengirim data ke Redux store
  }

  return (
    <div>
      <button onClick={fetchJobs}>Fetch Jobs</button>
      <ul>
        {jobs.map((job: Job) => (  // Menentukan tipe Job pada map
          <li key={job.id}>
            {job.title} - {job.company}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobList
