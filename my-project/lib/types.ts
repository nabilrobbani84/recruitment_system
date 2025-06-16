// src/lib/types.ts

// Tipe untuk Pekerjaan
export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  category: string;
  salary?: number;
  description: string;
  requirements: string[];
  postedAt: string; // ISO 8601 date string
}

// Tipe untuk filter pencarian pekerjaan
export interface JobFilterParams {
  query?: string;
  location?: string;
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}

// Tipe untuk Lamaran
export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Offered' | 'Rejected';
}

// Tipe untuk Profil Kandidat
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  headline: string; // e.g., "Software Engineer at Google"
  summary: string;
  cvUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export interface Skill {
  id: string | number;
  name: string;
}

export interface SkillSuggestion {
  id: string | number;
  name: string;
  jobCount: number;
}

// =================================================================
// --- PENAMBAHAN TIPE DATA UNTUK BLOGSERVICE ---
// =================================================================

/**
 * @interface BlogPost
 * @description Mendefinisikan struktur data untuk satu artikel atau postingan blog.
 * Ini adalah tipe data mentah yang diharapkan dari API sebelum transformasi.
 */
export interface BlogPost {
  id: number | string;
  slug: string; // URL-friendly identifier, e.g., "panduan-sukses-wawancara"
  title: string;
  content: string; // Isi artikel, bisa dalam format HTML atau Markdown
  excerpt: string; // Ringkasan singkat dari artikel
  imageUrl: string; // URL gambar sampul
  authorName: string;
  authorAvatarUrl?: string; // URL foto avatar penulis (opsional)
  category: string;
  tags: string[]; // Daftar tag terkait artikel
  publishedAt: string; // Tanggal publikasi dalam format string ISO 8601
}

/**
 * @interface PaginatedApiResponse<T>
 * @description Tipe generik untuk respons API yang mengandung data dengan paginasi.
 * Dapat digunakan kembali untuk berbagai jenis data (BlogPost, Job, dll).
 * @template T - Tipe dari item data yang ada di dalam array `data`.
 */
export interface PaginatedApiResponse<T> {
  /**
   * Array yang berisi item-item data pada halaman saat ini.
   */
  data: T[];
  /**
   * Objek yang berisi metadata paginasi dari server.
   */
  meta: {
    /**
     * Jumlah total semua item yang tersedia di server.
     */
    total: number;
    // Backend mungkin juga menyertakan informasi lain seperti:
    // page: number;
    // limit: number;
  };
}