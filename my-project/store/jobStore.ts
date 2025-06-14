// src/store/jobStore.ts

import { create } from 'zustand';
import * as jobService from '@/services/jobService'; // Asumsi service ini ada
import type { Job, JobFilterParams } from '@/lib/types'; // Asumsi tipe ini ada

// Tipe untuk state paginasi
interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  limit: number;
}

// Tipe untuk state store pekerjaan
interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  filters: JobFilterParams;
  pagination: PaginationState;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  setFilters: (newFilters: Partial<JobFilterParams>) => void;
  setPage: (page: number) => void;
  clearSelectedJob: () => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  // --- STATE ---
  jobs: [],
  selectedJob: null,
  filters: {
    query: '',
    location: '',
    type: '',
    category: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    limit: 10,
  },
  status: 'idle',
  error: null,
  
  // --- ACTIONS ---
  fetchJobs: async () => {
    set({ status: 'loading', error: null });
    try {
      const { filters, pagination } = get();
      const params: JobFilterParams = {
        ...filters,
        page: pagination.currentPage,
        limit: pagination.limit,
      };
      
      // Asumsi jobService.getAllJobs mengembalikan { data: Job[], pagination: PaginationState }
      const response = await jobService.getAllJobs(params);
      
      set({
        jobs: response.data,
        pagination: response.pagination,
        status: 'success',
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Gagal memuat data pekerjaan.';
      set({ status: 'error', error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  fetchJobById: async (id: string) => {
    set({ status: 'loading', error: null, selectedJob: null });
    try {
      const job = await jobService.getJobById(id);
      set({ selectedJob: job, status: 'success' });
    } catch (error: any) {
      const errorMessage = error.message || 'Gagal memuat detail pekerjaan.';
      set({ status: 'error', error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  setFilters: (newFilters: Partial<JobFilterParams>) => {
    const currentState = get();
    // Gabungkan filter lama dengan yang baru dan reset halaman ke 1
    set({
      filters: { ...currentState.filters, ...newFilters },
      pagination: { ...currentState.pagination, currentPage: 1 },
    });
    // Panggil kembali fetchJobs dengan filter baru
    get().fetchJobs();
  },

  setPage: (page: number) => {
    const currentState = get();
    set({ pagination: { ...currentState.pagination, currentPage: page } });
    get().fetchJobs();
  },

  clearSelectedJob: () => {
    set({ selectedJob: null });
  },
}));