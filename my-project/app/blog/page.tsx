// src/app/blog/page.tsx
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { blogService } from '@/services/blogService';
import type { PaginatedBlogPosts, GetBlogPostsParams } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import { BlogCard } from '@/component/blog/blogCard';
import { AlertTriangle, LoaderCircle, Search } from 'lucide-react';

// Komponen Pagination Internal
const Pagination = ({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) => {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-4 mt-16 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded-lg border bg-white font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>
      <span className="font-medium text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded-lg border bg-white font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Selanjutnya
      </button>
    </nav>
  );
};

// Komponen Pembungkus untuk Suspense
const BlogPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [blogData, setBlogData] = useState<PaginatedBlogPosts | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const navigateWithParams = useCallback((newParams: Record<string, string | number>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        current.set(key, String(value));
      } else {
        current.delete(key);
      }
    });

    if ('q' in newParams || 'category' in newParams) {
      current.delete('page');
    }
    
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    if (debouncedSearchQuery !== currentQuery) {
      navigateWithParams({ q: debouncedSearchQuery });
    }
  }, [debouncedSearchQuery, navigateWithParams, searchParams]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      const params: GetBlogPostsParams = {
        page: Number(searchParams.get('page') || '1'),
        limit: 9,
        searchQuery: searchParams.get('q') || undefined,
        category: searchParams.get('category') || undefined,
      };

      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          blogService.getPosts(params),
          blogService.getCategories(),
        ]);
        setBlogData(postsResponse);
        setCategories(categoriesResponse);
      } catch (e: any) {
        setError(e.message || "Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Jelajahi Blog & Berita Kami</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan wawasan, berita, dan saran terbaru dari tim kami untuk membantu perjalanan karir Anda.
          </p>
        </div>

        <div className="sticky top-4 bg-gray-50/80 backdrop-blur-sm z-10 py-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={searchParams.get('category') || ''}
              onChange={(e) => navigateWithParams({ category: e.target.value })}
              className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Kategori</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoaderCircle className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center text-center py-20 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-800">Terjadi Kesalahan</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && blogData && (
          <>
            {blogData.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData.posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800">Tidak Ada Artikel Ditemukan</h3>
                <p className="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
              </div>
            )}

            <Pagination
              totalPages={blogData.totalPages}
              currentPage={blogData.currentPage}
              onPageChange={(page) => navigateWithParams({ page: page })}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Gunakan Suspense untuk memastikan hooks searchParams bisa digunakan
export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}