// src/components/company/CompanyCategoryFilters.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Asumsi ada fungsi helper classnames

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Fungsi untuk memanggil API
async function getCategories(): Promise<Category[]> {
  // Ganti dengan apiClient Anda jika sudah ada
  const response = await fetch('/api/v1/data/company-specializations'); 
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.data;
}

export function CompanyCategoryFilters() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'relevant'; // Default ke 'relevan'

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Simulasi data fetch, ganti dengan logika fetch API Anda
        const fetchedData: Category[] = [
          { id: 1, name: 'Relevan', slug: 'relevant' },
          { id: 2, name: 'Website', slug: 'website' },
          { id: 3, name: 'Cyber Security', slug: 'cyber-security' },
          { id: 4, name: 'Network', slug: 'network' },
          { id: 5, name: 'Data', slug: 'data' },
          { id: 6, name: 'Design', slug: 'design' },
          { id: 7, name: 'Android', slug: 'android' },
        ];
        setCategories(fetchedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);
  
  const handleFilterClick = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'relevant') {
        params.delete('category');
    } else {
        params.set('category', slug);
    }
    params.set('page', '1'); // Reset ke halaman pertama saat filter berubah
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-12">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleFilterClick(category.slug)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
            currentCategory === category.slug
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
