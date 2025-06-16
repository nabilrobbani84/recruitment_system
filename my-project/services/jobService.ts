// src/services/jobService.ts

import apiClient from '@/lib/apiClient';
import { Job, PaginatedApiResponse } from '@/lib/types';
import axios from 'axios';

// ... (Interface GetJobsParams dan PaginatedJobsResponse tetap sama)
export interface GetJobsParams {
  q?: string;
  location?: string;
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedJobsResponse {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
}

// ... (Fungsi getJobs dan getJobById tetap sama)
async function getJobs(params: GetJobsParams): Promise<PaginatedJobsResponse> {
  // ... implementasi yang sudah ada
}

async function getJobById(id: string): Promise<Job | null> {
    // ... implementasi yang sudah ada
}


// --- PENAMBAHAN FUNGSI BARU ---

/**
 * Mengambil daftar pekerjaan unggulan berdasarkan kriteria tertentu.
 * @param params - Objek untuk filter, misal { category: 'it', limit: 4 }
 * @returns Promise yang resolve menjadi array Job.
 */
async function getFeaturedJobs(params: { category?: string, limit?: number }): Promise<Job[]> {
  try {
    const queryParams = new URLSearchParams({
      _limit: String(params.limit || 4),
    });
    if (params.category) {
      queryParams.append('category', params.category);
    }
    
    const response = await apiClient.get<Job[]>(`/jobs?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch featured jobs:", error);
    return []; // Kembalikan array kosong jika gagal
  }
}

/**
 * Mengambil pekerjaan yang direkomendasikan untuk pengguna yang sedang login.
 * Endpoint ini diasumsikan terproteksi dan memerlukan token otentikasi.
 * @returns Promise yang resolve menjadi array Job.
 */
async function getRecommendedJobs(): Promise<Job[]> {
  try {
    // apiClient sudah dikonfigurasi dengan interceptor untuk mengirim token secara otomatis
    const response = await apiClient.get<Job[]>('/jobs/recommended?_limit=4');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Tidak perlu console.error jika user belum login, ini adalah kondisi normal
      return [];
    }
    console.error("Failed to fetch recommended jobs:", error);
    return [];
  }
}

export const jobService = {
  getJobs,
  getJobById,
  getFeaturedJobs,      // <-- Fungsi baru
  getRecommendedJobs,   // <-- Fungsi baru
};