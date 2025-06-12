
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { authService } from '@/services/authService'; // Asumsi Anda punya service ini

// Definisikan tipe untuk User Anda
// Ini adalah contoh, sesuaikan dengan struktur data pengguna Anda
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer' | 'admin'; // Contoh peran pengguna
  // Tambahkan properti lain yang relevan
}

// Definisikan tipe untuk data registrasi
// Ini adalah contoh, sesuaikan dengan data yang dibutuhkan untuk registrasi
export interface RegisterData {
  fullName: string;
  email: string;
  password_UNSAFE: string; // Ingat untuk tidak menyimpan password plain text
  accountType: 'candidate' | 'employer';
}

interface AuthContextType {
  user: User | null; // Menggunakan tipe User yang sudah didefinisikan
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>; // Menggunakan tipe RegisterData
  logout: () => Promise<void>;
  // Tambahkan fungsi lain seperti forgotPassword, resetPassword, etc.
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Menggunakan tipe User
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // TODO: Cek sesi pengguna saat aplikasi dimuat
        // const currentUser = await authService.getCurrentUser();
        // setUser(currentUser);
        console.log("Checking user session (placeholder)...");
      } catch (err) { // Mengganti 'error' dengan 'err' untuk digunakan
        console.error("Error checking user session:", err); // Menggunakan variabel error
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      // TODO: Implementasi login dengan backend
      // const loggedInUser = await authService.login(email, pass);
      // setUser(loggedInUser);
      console.log("Login process (placeholder)...", email, pass);
      // Placeholder user object, pastikan sesuai dengan interface User
      setUser({ id: '1', email, name: "Pengguna Terdaftar", role: 'candidate' });
      setIsLoading(false);
    } catch (err) { // Mengganti 'error' dengan 'err' untuk digunakan
      setIsLoading(false);
      console.error("Login failed:", err); // Menggunakan variabel error
      throw err; // Melempar kembali error agar bisa ditangani di komponen
    }
  };

  const register = async (data: RegisterData) => { // Menggunakan tipe RegisterData
    setIsLoading(true);
    try {
      // TODO: Implementasi registrasi dengan backend
      // await authService.register(data);
      console.log("Register process (placeholder)...", data);
      setIsLoading(false);
    } catch (err) { // Mengganti 'error' dengan 'err' untuk digunakan
      setIsLoading(false);
      console.error("Registration failed:", err); // Menggunakan variabel error
      throw err; // Melempar kembali error
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Implementasi logout dengan backend
      // await authService.logout();
      setUser(null);
      console.log("Logout process (placeholder)...");
      setIsLoading(false);
    } catch (err) { // Mengganti 'error' dengan 'err' untuk digunakan
      setIsLoading(false);
      console.error("Logout failed:", err); // Menggunakan variabel error
      throw err; // Melempar kembali error
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};