// src/services/blogService.ts

import apiClient from '@/lib/apiClient';
import { BlogPost, PaginatedApiResponse, TransformedBlogPost, PaginatedBlogPosts } from '@/lib/types'; // Asumsikan tipe diekspor dari types.ts
import axios from 'axios';

// --- Tipe Data dan Fungsi Helper (diasumsikan sudah benar) ---
interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  searchQuery?: string;
  sortBy?: 'publishedAt' | 'title';
  order?: 'asc' | 'desc';
}

const transformPost = (post: BlogPost): TransformedBlogPost => {
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return {
    ...post,
    publishedAt: new Date(post.publishedAt),
    readingTimeMinutes,
  };
};


// --- Objek Service Utama dengan Perbaikan ---

export const blogService = {
  /**
   * Mengambil daftar postingan blog dengan opsi pagination, filter, dan pencarian.
   */
  async getPosts(params: GetBlogPostsParams = {}): Promise<PaginatedBlogPosts> {
    const queryParams = new URLSearchParams({
      _page: String(params.page || 1),
      _limit: String(params.limit || 9),
      _sort: params.sortBy || 'publishedAt',
      _order: params.order || 'desc',
    });
    if (params.category) queryParams.append('category', params.category);
    if (params.searchQuery) queryParams.append('q', params.searchQuery);
    
    try {
      const response = await apiClient.get<PaginatedApiResponse<BlogPost>>(`/posts?${queryParams.toString()}`);
      const apiData = response.data;
      const transformedPosts = apiData.data.map(transformPost);
      
      return {
        posts: transformedPosts,
        totalPosts: apiData.meta.total,
        totalPages: Math.ceil(apiData.meta.total / (params.limit || 9)),
        currentPage: params.page || 1,
        hasNextPage: (params.page || 1) * (params.limit || 9) < apiData.meta.total,
        hasPrevPage: (params.page || 1) > 1,
      };

    } catch (error: unknown) {
      console.error("Error fetching blog posts:", error);
      
      // PERBAIKAN: Kembalikan state kosong, bukan melempar error.
      // Ini mencegah halaman crash dan error ts(2345).
      return {
        posts: [],
        totalPosts: 0,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }
  },

  /**
   * Mengambil satu postingan blog berdasarkan slug-nya.
   */
  async getPostBySlug(slug: string): Promise<TransformedBlogPost | null> {
    try {
      const response = await apiClient.get<BlogPost[]>(`/posts?slug=${slug}`);
      const postData = response.data[0];

      if (!postData) {
        return null; // Benar, untuk menampilkan halaman 404
      }
      return transformPost(postData);
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      return null; // Benar, untuk menampilkan halaman 404
    }
  },

  /**
   * Mengambil daftar semua kategori blog yang tersedia.
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>('/categories');
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return []; // Kembalikan array kosong jika gagal
    }
  }
};