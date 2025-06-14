// src/store/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as authService from '@/services/authService'; // Asumsi service ini ada
import type { LoginCredentials, RegisterPayload } from '@/services/authService'; // Asumsi tipe ini ada di service

// Tipe untuk data pengguna yang disimpan di store
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
}

// Tipe untuk state store otentikasi
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  isAuthenticated: () => boolean; // Fungsi turunan (derived function)
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  checkAuth: () => void; // Untuk memeriksa status dari localStorage saat app load
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // --- STATE ---
      user: null,
      token: null,
      status: 'idle',
      error: null,
      
      // --- DERIVED STATE ---
      isAuthenticated: () => !!get().token && !!get().user,

      // --- ACTIONS ---
      login: async (credentials) => {
        set({ status: 'loading', error: null });
        try {
          const { user, token } = await authService.login(credentials);
          set({ user, token, status: 'success' });
          // Di sini Anda juga bisa mengatur token di header default apiClient
        } catch (error: any) {
          const errorMessage = error.message || 'Login gagal. Periksa kembali email dan password Anda.';
          set({ status: 'error', error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      register: async (payload) => {
        set({ status: 'loading', error: null });
        try {
          const { user, token } = await authService.register(payload);
          set({ user, token, status: 'success' });
        } catch (error: any) {
          const errorMessage = error.message || 'Registrasi gagal. Coba lagi nanti.';
          set({ status: 'error', error: errorMessage });
          throw new Error(errorMessage);
        }
      },
      
      logout: () => {
        // Hapus token dari apiClient jika ada
        set({ user: null, token: null, status: 'idle', error: null });
        // Bisa juga ditambahkan logic untuk membersihkan state store lain
      },
      
      // Aksi ini tidak mengubah state, hanya memeriksa
      // dan membiarkan middleware `persist` me-rehidrasi state
      checkAuth: () => {
        const token = get().token;
        if (!token) {
          get().logout();
        }
      },
    }),
    {
      // --- KONFIGURASI PERSIST ---
      name: 'auth-storage', // Nama key di localStorage
      storage: createJSONStorage(() => localStorage), // (opsional) default-nya localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // Hanya simpan user dan token
    }
  )
);