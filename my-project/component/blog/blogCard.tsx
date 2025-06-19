// src/components/blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { Calendar, User } from 'lucide-react';

// Menggunakan tipe TransformedBlogPost yang dihasilkan oleh service Anda
type TransformedBlogPost = Omit<BlogPost, 'publishedAt'> & {
  publishedAt: Date;
  readingTimeMinutes?: number;
};

interface BlogCardProps {
  post: TransformedBlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block relative h-52 w-full">
        <Image
          src={post.imageUrl}
          alt={`Gambar sampul untuk ${post.title}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase">{post.category}</p>
          <Link href={`/blog/${post.slug}`} className="mt-2 block">
            <h3 className="text-xl font-bold leading-snug text-gray-900 group-hover:text-blue-700">
              {post.title}
            </h3>
            <p className="mt-3 text-base text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
                <Image
                  className="h-8 w-8 rounded-full"
                  src={post.authorAvatarUrl || '/images/default-avatar.png'}
                  alt={`Avatar ${post.authorName}`}
                  width={32}
                  height={32}
                />
                <span className="font-medium text-gray-800">{post.authorName}</span>
            </div>
            <time dateTime={post.publishedAt.toISOString()} className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.publishedAt.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
        </div>
      </div>
    </article>
  );
}