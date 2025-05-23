import { useState } from 'react'
import { useRouter } from 'next/router'

const ApplyJobPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cv, setCv] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!name || !email || !cv) {
      setError('Please fill in all fields and upload your CV.')
      setIsSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('cv', cv)

    try {
      // Replace with your API request
      // const response = await axios.post('/api/apply', formData)

      // Simulate successful submission
      setTimeout(() => {
        setIsSubmitting(false)
        router.push('/jobs') // Redirect to jobs list or success page
      }, 1500)
    } catch (error) {
      setError('Failed to submit application. Please try again later.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Apply for Job</h2>

      {error && <div className="bg-red-500 text-white p-3 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-2 border rounded"
            placeholder="Your full name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border rounded"
            placeholder="Your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cv" className="block text-sm font-semibold text-gray-700">Upload CV</label>
          <input
            type="file"
            id="cv"
            onChange={(e) => setCv(e.target.files ? e.target.files[0] : null)}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  )
}

export default ApplyJobPage
