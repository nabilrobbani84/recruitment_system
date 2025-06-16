// src/services/authService.ts

// 1. PERBAIKAN IMPORT: Impor 'apiClient' sebagai default, dan 'setAuthToken' sebagai named.
import apiClient, { setAuthToken } from '@/lib/apiClient';
import axios from 'axios'; // Impor axios untuk menggunakan type guard-nya
import type { AuthUser } from '@/store/authStore';

// --- Tipe Data (Tidak ada perubahan) ---
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

// --- Fungsi-fungsi Service ---

async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // 2. PERBAIKAN ERROR HANDLING: Ganti 'any' dengan 'unknown'
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error: unknown) { // Gunakan 'unknown'
    // Lakukan type check sebelum mengakses properti error
    if (axios.isAxiosError(error) && error.response) {
      // Sekarang aman untuk mengakses error.response.data
      throw new Error(error.response.data.message || 'Email atau password salah.');
    }
    // Fallback untuk error non-Axios (misal: masalah jaringan)
    throw new Error('Terjadi kesalahan koneksi. Silakan coba lagi.');
  }
}

async function register(payload: RegisterPayload): Promise<AuthResponse> {
  // 3. PERBAIKAN ERROR HANDLING: Ganti 'any' dengan 'unknown'
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error: unknown) { // Gunakan 'unknown'
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registrasi gagal. Periksa kembali data Anda.');
    }
    throw new Error('Terjadi kesalahan koneksi. Silakan coba lagi.');
  }
}

function logout() {
  setAuthToken(null);
  console.log("Auth token cleared from API client.");
}

export const authService = {
  login,
  register,
  logout,
};