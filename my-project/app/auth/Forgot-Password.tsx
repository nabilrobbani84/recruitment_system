import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi input email
    if (!email) {
      setError('Email is required');
      setIsSubmitting(false);
      return;
    }

    // Simulasi permintaan untuk reset password
    try {
      // Anda bisa menggantikan ini dengan panggilan API untuk mengirimkan email reset password
      setTimeout(() => {
        setSuccessMessage('If an account with that email exists, we will send a reset link.');
        setEmail('');
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {  // Menggunakan `error` di sini dan mencetaknya jika diperlukan
      setError('Failed to send reset link. Please try again later.');
      console.error('Reset password error:', error); // Menampilkan error di konsol
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Forgot Password</h2>

      {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
      {successMessage && <div className="bg-green-500 text-white p-3 mb-4 rounded">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border rounded"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
