import axiosInstance from '../lib/axiosInstance'; 

// Definisikan tipe data untuk request dan response jika diperlukan
interface LoginCredentials {
  email: string;
  password_hash: string; // Sesuaikan dengan field yang diharapkan backend
}

interface RegisterData {
  full_name: string;
  email: string;
  password_hash: string;
  role: 'candidate' | 'employer'; // Sesuaikan
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    role: 'candidate' | 'employer';
  };
}
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('Simulating login:', credentials);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (credentials.email === "gagal@mail.com") throw new Error("Email atau password salah (simulasi).");
    return {
      token: 'dummy-auth-token-12345',
      user: {
        id: 'user-1',
        full_name: credentials.email.split('@')[0],
        email: credentials.email,
        role: credentials.email.includes('employer') ? 'employer' : 'candidate',
      },
    };
  },

  register: async (data: RegisterData): Promise<void> => {
    // await axiosInstance.post('/auth/register', data);
    console.log('Simulating register:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (data.email === "sudahada@mail.com") throw new Error("Email sudah terdaftar (simulasi).");
  },

  forgotPassword: async (data: { email: string }): Promise<void> => {
    console.log('Simulating forgot password:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  resetPassword: async (data: { token: string; new_password_hash: string }): Promise<void> => {
    console.log('Simulating reset password for token:', data.token);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (data.token === "invalid-token") throw new Error("Token tidak valid atau kedaluwarsa (simulasi).");
  },
};