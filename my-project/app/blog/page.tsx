// src/app/blog/page.tsx

import { blogService } from '@/services/blogService';
import { BlogCard } from '@/component/blog/blogCard';
import { BlogCategories } from '@/component/blog/blogCategories';
import { SearchBar } from '@/component/common/SearchBar';
import { Pagination } from '@/component/common/Pagination';
import { SectionTitle } from '@/component/common/SectionTitle';

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    q?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const searchQuery = searchParams.q;

  // Ambil data postingan dan kategori secara bersamaan
  const [postsData, categories] = await Promise.all([
    blogService.getPosts({
      page,
      limit: 6, // Tampilkan 6 postingan per halaman
      category,
      searchQuery,
    }),
    blogService.getCategories(),
  ]);

  const { posts, totalPages, currentPage } = postsData;

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <SectionTitle
          align="center"
          title="Blog & Wawasan Karir"
          subtitle="Dapatkan tips terbaru seputar pengembangan karir, wawancara, dan dunia kerja dari para ahli."
        />

        {/* Layout Utama: Grid 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          
          {/* Kolom Sidebar (muncul di atas pada layar mobile) */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 h-fit">
            <SearchBar placeholder="Cari artikel..." basePath="/blog" />
            <BlogCategories categories={categories} />
          </aside>

          {/* Kolom Utama (Daftar Postingan) */}
          <div className="lg:col-span-3">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map(post => (
                    // @ts-ignore - Mengasumsikan `post` sudah ditransformasi oleh service
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                <Pagination totalPages={totalPages} currentPage={currentPage} />
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800">Artikel Tidak Ditemukan</h3>
                <p className="text-gray-500 mt-2">Coba gunakan kata kunci atau filter kategori yang lain.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}