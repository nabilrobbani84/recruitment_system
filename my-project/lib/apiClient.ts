import axios from 'axios';

// Membuat instance Axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  Interceptor untuk Menambahkan Token Otentikasi ke Setiap Request.
  Token bisa diambil dari local storage, cookies, atau state management.
*/
apiClient.interceptors.request.use(
  (config) => {
    // Diasumsikan token disimpan di local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
  Interceptor untuk menangani respons error secara global.
  Misalnya, jika token expired (status 401), kita bisa redirect ke halaman login.
*/
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthenticated error (misal: hapus token & redirect)
      console.error("Unauthenticated! Redirecting to login...");
      // window.location.href = '/login';
    }
    // Melempar error agar bisa ditangkap oleh blok catch di service
    return Promise.reject(error);
  }
);


export default apiClient;