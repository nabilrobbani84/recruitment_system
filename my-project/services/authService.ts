// src/services/authService.ts

import { apiClient, setAuthToken } from '@/lib/apiClient'; // Asumsi ada API client terpusat
import type { AuthUser } from '@/store/authStore'; // Impor tipe AuthUser

// --- Tipe Data untuk Payload & Respons ---

/**
 * @interface LoginCredentials
 * @description Tipe data untuk kredensial yang dibutuhkan saat login.
 * HARUS DIEKSPOR agar bisa digunakan oleh file lain seperti authStore.
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * @interface RegisterPayload
 * @description Tipe data untuk payload yang dikirim saat registrasi pengguna baru.
 * HARUS DIEKSPOR.
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

/**
 * @interface AuthResponse
 * @description Tipe data untuk respons yang diharapkan dari API setelah login/register berhasil.
 */
interface AuthResponse {
  user: AuthUser;
  token: string;
}

// --- Objek Service Utama ---

/**
 * Mengirim permintaan login ke server.
 * @param credentials - Objek berisi email dan password.
 * @returns Promise yang resolve menjadi data pengguna dan token.
 */
async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Setelah berhasil login, pasang token di header default apiClient untuk permintaan selanjutnya
    setAuthToken(response.data.token);
    
    return response.data;
  } catch (error: any) {
    // Tangani dan lempar kembali error dengan pesan yang lebih spesifik
    throw new Error(error.response?.data?.message || 'Login gagal');
  }
}

/**
 * Mengirim permintaan registrasi ke server.
 * @param payload - Data lengkap untuk registrasi pengguna baru.
 * @returns Promise yang resolve menjadi data pengguna dan token.
 */
async function register(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);

    // Setelah berhasil registrasi, langsung pasang token
    setAuthToken(response.data.token);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registrasi gagal');
  }
}

/**
 * Menghapus token dari header apiClient.
 */
function logout() {
  // Hapus token dari header default apiClient
  setAuthToken(null);
  console.log("Auth token cleared from API client.");
}

export const authService = {
  login,
  register,
  logout,
};