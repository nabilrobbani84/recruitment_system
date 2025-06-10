// src/components/auth/LoginForm.tsx
'use client'; // Karena akan menggunakan state dan event handler

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from '@/component/common/InputField';
import Button from '@/component/common/Button';
import { Mail, Lock, LogIn } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth'; // Jika sudah ada AuthContext

export default function LoginForm() {
  const router = useRouter();
  // const { login } = useAuth(); // Contoh penggunaan AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // TODO: Implementasi logika login
    // Contoh:
    // try {
    //   await login(email, password); // Panggil fungsi login dari context/service
    //   router.push('/profile'); // Arahkan ke dashboard setelah login sukses
    // } catch (err: any) {
    //   setError(err.message || 'Login gagal. Periksa kembali email dan password Anda.');
    // } finally {
    //   setIsLoading(false);
    // }

    // Placeholder
    console.log('Login attempt:', { email, password });
    setTimeout(() => {
      if (email === "user@example.com" && password === "password") {
        alert('Login Berhasil! (Placeholder)');
        router.push('/profile'); // Ganti dengan rute dashboard yang sesuai
      } else {
        setError('Email atau password salah. (Placeholder)');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <InputField
        label="Alamat Email"
        name="email"
        type="email"
        Icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="anda@email.com"
        required
        autoComplete="email"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        Icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary-dark border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Ingat Saya
          </label>
        </div>
        <div className="text-sm">
          <Link href="/forgot-password" legacyBehavior>
            <a className="font-medium text-primary hover:text-primary-dark">
              Lupa password?
            </a>
          </Link>
        </div>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        <LogIn className="mr-2 h-5 w-5" />
        Masuk
      </Button>

      <p className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link href="/register" legacyBehavior>
          <a className="font-medium text-primary hover:text-primary-dark">
            Daftar di sini
          </a>
        </Link>
      </p>
    </form>
  );
}