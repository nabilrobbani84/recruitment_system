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

// --- PENAMBAHAN UNTUK MEMPERBAIKI ERROR ---

/**
 * Tipe data dasar untuk sebuah Keahlian (Skill).
 * Digunakan untuk merepresentasikan keahlian yang dimiliki oleh seorang kandidat.
 */
export interface Skill {
  id: string | number; // ID bisa string atau number tergantung implementasi backend
  name: string;
}

/**
 * Tipe data untuk saran Keahlian (Skill Suggestion) pada fitur pencarian.
 * Biasanya menyertakan data tambahan seperti jumlah pekerjaan yang relevan.
 */
export interface SkillSuggestion {
  id: string | number;
  name: string;
  jobCount: number; // Jumlah pekerjaan yang membutuhkan keahlian ini
}
// --- AKHIR PENAMBAHAN ---