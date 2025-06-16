// src/services/jobService.ts

import apiClient from '@/lib/apiClient';
import { Job, PaginatedApiResponse } from '@/lib/types';

/**
 * @interface GetJobsParams
 * @description Parameter untuk mengambil daftar pekerjaan dengan filter dan paginasi.
 */
export interface GetJobsParams {
  q?: string;         // Kata kunci pencarian (query)
  location?: string;  // Filter berdasarkan lokasi
  type?: string;      // Filter berdasarkan tipe pekerjaan (Full-time, etc.)
  category?: string;  // Filter berdasarkan kategori
  page?: number;      // Nomor halaman
  limit?: number;     // Jumlah item per halaman
}

/**
 * @interface PaginatedJobsResponse
 * @description Struktur respons paginasi untuk data pekerjaan yang sudah siap tampil.
 */
export interface PaginatedJobsResponse {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Mengambil daftar pekerjaan dari API dengan opsi filter dan paginasi.
 * @param params - Objek parameter untuk filtering dan paginasi.
 * @returns Promise yang resolve menjadi data pekerjaan terpaginasi.
 */
async function getJobs(params: GetJobsParams): Promise<PaginatedJobsResponse> {
  try {
    const queryParams = new URLSearchParams({
      _page: String(params.page || 1),
      _limit: String(params.limit || 10),
    });

    if (params.q) queryParams.append('q', params.q);
    if (params.location) queryParams.append('location', params.location);
    if (params.type) queryParams.append('type', params.type);
    if (params.category) queryParams.append('category', params.category);

    const response = await apiClient.get<PaginatedApiResponse<Job>>(`/jobs?${queryParams.toString()}`);
    const { data, meta } = response.data;
    
    return {
      jobs: data,
      totalJobs: meta.total,
      currentPage: params.page || 1,
      totalPages: Math.ceil(meta.total / (params.limit || 10)),
    };
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    // Kembalikan state kosong jika terjadi error agar halaman tidak crash
    return { jobs: [], totalJobs: 0, currentPage: 1, totalPages: 1 };
  }
}

async function getJobById(id: string): Promise<Job | null> {
  try {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch job with id ${id}:`, error);
    return null;
  }
}

export const jobService = {
  getJobs,
  getJobById,
};