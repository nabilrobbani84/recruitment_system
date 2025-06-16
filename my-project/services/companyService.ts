// src/services/companyService.ts
import axios from 'axios';

import apiClient from '@/lib/apiClient';
import { Company, PaginatedApiResponse } from '@/lib/types';

/**
 * @interface GetCompaniesParams
 * @description Parameter untuk mengambil daftar perusahaan dengan filter dan paginasi.
 */
export interface GetCompaniesParams {
  q?: string;      // Kata kunci pencarian nama perusahaan
  page?: number;   // Nomor halaman
  limit?: number;  // Jumlah item per halaman
}

/**
 * @interface PaginatedCompaniesResponse
 * @description Struktur respons paginasi untuk data perusahaan.
 */
export interface PaginatedCompaniesResponse {
  companies: Company[];
  totalCompanies: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Mengambil daftar perusahaan dari API dengan opsi pencarian dan paginasi.
 * @param params - Objek parameter untuk filtering dan paginasi.
 * @returns Promise yang resolve menjadi data perusahaan terpaginasi.
 */
async function getCompanies(params: GetCompaniesParams): Promise<PaginatedCompaniesResponse> {
  try {
    const queryParams = new URLSearchParams({
      _page: String(params.page || 1),
      _limit: String(params.limit || 12), // Tampilkan 12 perusahaan per halaman
    });

    if (params.q) {
      queryParams.append('q', params.q);
    }

    const response = await apiClient.get<PaginatedApiResponse<Company>>(`/companies?${queryParams.toString()}`);
    const { data, meta } = response.data;
    
    return {
      companies: data,
      totalCompanies: meta.total,
      currentPage: params.page || 1,
      totalPages: Math.ceil(meta.total / (params.limit || 12)),
    };
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return { companies: [], totalCompanies: 0, currentPage: 1, totalPages: 1 };
  }
}

export const companyService = {
  getCompanies,
};