// src/services/blogService.ts

// PERBAIKAN: Impor apiClient sebagai default.
import apiClient from '@/lib/apiClient'; 
import { BlogPost, PaginatedApiResponse } from '@/lib/types';
import axios from 'axios';

// --- (Tipe data dan fungsi transformPost tetap sama) ---
// ...

export const blogService = {
  // ... (Fungsi getPosts tetap sama dengan error handling yang lebih baik)
  async getPosts(params: GetBlogPostsParams = {}): Promise<PaginatedBlogPosts> {
    try {
        // ... Logika getPosts
    } catch (error: unknown) {
        console.error("Error fetching blog posts:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Gagal memuat postingan blog.");
        }
        throw new Error("Terjadi kesalahan yang tidak diketahui.");
    }
  },

  async getPostBySlug(slug: string): Promise<TransformedBlogPost | null> {
    try {
      const response = await apiClient.get<BlogPost[]>(`/posts?slug=${slug}`);
      const postData = response.data[0];

      if (!postData) {
        // Kembalikan null jika post tidak ditemukan, agar halaman bisa menampilkan 404
        return null; 
      }
      return transformPost(postData);
    } catch (error: unknown) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      // Jangan lempar error, kembalikan null agar bisa ditangani di halaman
      return null;
    }
  },
  
  // ... (Fungsi getCategories tetap sama)
};