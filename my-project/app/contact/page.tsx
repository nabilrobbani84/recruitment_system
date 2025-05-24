import { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation: Make sure fields are not empty
    if (!name || !email || !message) {
      setError('All fields are required!')
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate form submission (replace with your actual API request)
      setTimeout(() => {
        setIsSubmitting(false)
        alert('Your message has been sent successfully!')
      }, 1500)
    } catch (err) {
      setError('Failed to submit your message. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-16 lg:px-24">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Contact Us</h2>

        {error && <div className="bg-red-500 text-white p-3 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border rounded"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 mt-2 border rounded"
              placeholder="Write your message here"
              rows={5}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
