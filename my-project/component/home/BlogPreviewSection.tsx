import React from 'react';
import { SectionTitle } from '@/component/common/SectionTitle';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Data dummy, idealnya dari API
const posts = [
  { id: 1, title: '5 Tips Jitu Menulis CV yang Dilirik HRD', excerpt: 'CV adalah kesan pertama Anda. Pelajari cara membuatnya menonjol...', image: '/images/blog/cv-tips.jpg', href: '/blog/cv-tips' },
  { id: 2, title: 'Panduan Sukses Wawancara Kerja untuk Fresh Graduate', excerpt: 'Jangan gugup! Persiapkan diri Anda dengan panduan lengkap ini...', image: '/images/blog/interview.jpg', href: '/blog/interview-guide' },
  { id: 3, title: 'Membangun Personal Branding di LinkedIn', excerpt: 'LinkedIn lebih dari sekadar CV online. Manfaatkan untuk karir Anda...', image: '/images/blog/linkedin.jpg', href: '/blog/linkedin-branding' },
];

export const BlogPreviewSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Explore Blog and News"
          subtitle="Dapatkan wawasan terbaru seputar dunia karir dan pengembangan diri."
          align="center"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg border">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.image} alt="" />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <Link href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 hover:text-blue-600">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6">
                  <Link href={post.href} className="text-sm font-semibold text-blue-600 hover:underline">
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};