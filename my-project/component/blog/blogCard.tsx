// src/components/blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
// PERBAIKAN: Impor kedua tipe dari @/lib/types
import type { BlogPost, TransformedBlogPost } from '@/lib/types';

// Tipe props sekarang sudah benar dan bisa diimpor
interface BlogCardProps {
  post: TransformedBlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block relative h-52 w-full rounded-2xl overflow-hidden shadow-md">
        <Image
          src={post.imageUrl}
          alt={`Gambar sampul untuk ${post.title}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="mt-4">
        <p className="text-sm font-semibold text-blue-600 uppercase">{post.category}</p>
        <Link href={`/blog/${post.slug}`} className="mt-1 block">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
            {post.title}
          </h3>
        </Link>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <p className="font-medium text-gray-800">{post.authorName}</p>
          <span aria-hidden="true">&middot;</span>
          {/* Tidak ada error lagi di sini karena 'publishedAt' dikenali sebagai Date */}
          <time dateTime={post.publishedAt.toISOString()}>
            {post.publishedAt.toLocaleDateString('id-ID', { month: 'long', day: 'numeric' })}
          </time>
        </div>
      </div>
    </article>
  );
}