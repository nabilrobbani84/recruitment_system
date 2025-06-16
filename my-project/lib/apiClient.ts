// src/lib/apiClient.ts

import axios from 'axios';

// Membuat instance Axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api', // Fallback untuk development
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Fungsi helper untuk memasang token otentikasi ke header default Axios.
 * @param token - Token JWT atau null untuk menghapusnya.
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

/*
  Interceptor untuk menangani respons error secara global.
  Misalnya, jika token expired (status 401), kita bisa redirect ke halaman login.
*/
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthenticated or Token Expired! Logging out...");
      // Di dunia nyata, Anda akan memanggil fungsi logout dari store di sini
      // untuk membersihkan state dan redirect pengguna.
      // Contoh: useAuthStore.getState().logout();
    }
    // Melempar error agar bisa ditangkap oleh blok catch di service
    return Promise.reject(error);
  }
);

// Meng-export instance sebagai default export
export default apiClient;