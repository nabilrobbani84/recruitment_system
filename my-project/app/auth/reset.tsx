// app/(auth)/reset-password/page.tsx
import { useState } from 'react';
import firebase from '../../lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const oobCode = params.get('oobCode'); // Firebase reset password link contains this parameter

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebase.auth().confirmPasswordReset(oobCode, password);
      router.push('/auth/login');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetPassword;
