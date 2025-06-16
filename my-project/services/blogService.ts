/**
 * @file blogService.ts
 * @description Service layer untuk semua interaksi terkait data blog.
 * Berfungsi sebagai jembatan antara komponen UI dan API endpoint blog,
 * menangani pengambilan data, parameterisasi, dan transformasi data.
 */

import { apiClient } from '@/lib/apiClient'; // Asumsi ada API client terpusat
import { BlogPost, PaginatedApiResponse } from '@/lib/types'; // Asumsi tipe data ini ada di file terpusat

// --- Tipe Data Spesifik untuk Parameter Service ---

/**
 * @interface GetBlogPostsParams
 * @description Mendefinisikan parameter yang bisa digunakan untuk mengambil daftar postingan blog.
 */
interface GetBlogPostsParams {
  /**
   * Nomor halaman untuk pagination.
   * @default 1
   */
  page?: number;
  /**
   * Jumlah post per halaman.
   * @default 10
   */
  limit?: number;
  /**
   * Filter post berdasarkan kategori (slug kategori).
   */
  category?: string;
  /**
   * Kata kunci untuk pencarian di judul atau konten.
   */
  searchQuery?: string;
  /**
   * Mengurutkan post berdasarkan 'publishedAt' atau 'title'.
   * @default 'publishedAt'
   */
  sortBy?: 'publishedAt' | 'title';
  /**
   * Arah pengurutan, 'desc' (terbaru) atau 'asc' (terlama).
   * @default 'desc'
   */
  order?: 'asc' | 'desc';
}

// --- Tipe Data untuk Respons yang Sudah Ditransformasi ---

/**
 * @type TransformedBlogPost
 * @description Representasi BlogPost setelah melalui transformasi data di service layer.
 * Contoh: properti 'publishedAt' diubah dari string ISO menjadi objek Date.
 */
type TransformedBlogPost = Omit<BlogPost, 'publishedAt'> & {
  publishedAt: Date;
  // Anda bisa menambahkan properti lain hasil transformasi di sini
  // misalnya, perkiraan waktu baca
  readingTimeMinutes?: number; 
};

/**
 * @type PaginatedBlogPosts
 * @description Representasi data paginasi untuk postingan blog yang sudah ditransformasi.
 */
type PaginatedBlogPosts = {
  posts: TransformedBlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// --- Fungsi Helper untuk Transformasi ---

/**
 * Mengubah data BlogPost mentah dari API menjadi format yang lebih ramah untuk frontend.
 * @param post - Objek BlogPost mentah dari API.
 * @returns Objek TransformedBlogPost.
 */
const transformPost = (post: BlogPost): TransformedBlogPost => {
  // Hitung perkiraan waktu baca (misal: 200 kata per menit)
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return {
    ...post,
    publishedAt: new Date(post.publishedAt), // Ubah string ISO menjadi objek Date
    readingTimeMinutes,
  };
};

// --- Objek Service Utama ---

export const blogService = {
  /**
   * Mengambil daftar postingan blog dengan opsi pagination, filter, dan pencarian.
   * @param params - Objek GetBlogPostsParams untuk kustomisasi query.
   * @returns Promise yang resolve menjadi objek PaginatedBlogPosts.
   * @throws Akan melempar error jika panggilan API gagal.
   */
  async getPosts(params: GetBlogPostsParams = {}): Promise<PaginatedBlogPosts> {
    // Menyiapkan query string dari parameter
    const queryParams = new URLSearchParams({
      _page: String(params.page || 1),
      _limit: String(params.limit || 9),
      _sort: params.sortBy || 'publishedAt',
      _order: params.order || 'desc',
    });

    if (params.category) {
      queryParams.append('category', params.category);
    }
    if (params.searchQuery) {
      queryParams.append('q', params.searchQuery);
    }
    
    try {
      // Melakukan panggilan API untuk mendapatkan data mentah
      const response = await apiClient.get<PaginatedApiResponse<BlogPost>>(`/posts?${queryParams.toString()}`);
      const apiData = response.data;

      // Transformasi setiap post dalam array
      const transformedPosts = apiData.data.map(transformPost);
      
      // Mengembalikan objek yang sudah terstruktur dan ditransformasi
      return {
        posts: transformedPosts,
        totalPosts: apiData.meta.total,
        totalPages: Math.ceil(apiData.meta.total / (params.limit || 9)),
        currentPage: params.page || 1,
        hasNextPage: (params.page || 1) * (params.limit || 9) < apiData.meta.total,
        hasPrevPage: (params.page || 1) > 1,
      };

    } catch (error) {
      console.error("Error fetching blog posts:", error);
      // Melempar kembali error agar bisa ditangani oleh pemanggil (misal: React Query)
      throw new Error("Gagal memuat postingan blog. Silakan coba lagi nanti.");
    }
  },

  /**
   * Mengambil satu postingan blog berdasarkan slug-nya.
   * @param slug - Slug unik dari postingan blog.
   * @returns Promise yang resolve menjadi satu objek TransformedBlogPost.
   * @throws Akan melempar error jika post dengan slug tersebut tidak ditemukan (404) atau error lainnya.
   */
  async getPostBySlug(slug: string): Promise<TransformedBlogPost> {
    try {
      // API mungkin mengembalikan array dengan 1 item saat query berdasarkan slug
      const response = await apiClient.get<BlogPost[]>(`/posts?slug=${slug}`);
      const postData = response.data[0];

      if (!postData) {
        throw new Error(`Post with slug "${slug}" not found.`);
      }

      return transformPost(postData);

    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw new Error("Gagal memuat detail postingan. Postingan mungkin tidak ada.");
    }
  },

  /**
   * Mengambil daftar semua kategori blog yang tersedia.
   * @returns Promise yang resolve menjadi array dari string (nama kategori).
   */
  async getCategories(): Promise<string[]> {
    try {
      // Ini adalah contoh, endpoint sesungguhnya bisa berbeda
      const response = await apiClient.get<string[]>('/categories');
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Gagal memuat kategori.");
    }
  }
};