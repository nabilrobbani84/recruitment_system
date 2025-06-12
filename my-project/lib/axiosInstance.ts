import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com/', // Ganti dengan URL API Anda
  timeout: 10000, // Waktu tunggu request (10 detik)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;   