// src/components/common/Pagination.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/jobs?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`flex items-center px-4 py-2 rounded-md ${
          currentPage === 1 ? 'bg-gray-200 text-gray-400 pointer-events-none' : 'bg-white text-gray-700 border hover:bg-gray-50'
        }`}
      >
        <ChevronLeft size={16} className="mr-1" />
        Previous
      </Link>
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <Link
        href={createPageURL(currentPage + 1)}
        className={`flex items-center px-4 py-2 rounded-md ${
          currentPage === totalPages ? 'bg-gray-200 text-gray-400 pointer-events-none' : 'bg-white text-gray-700 border hover:bg-gray-50'
        }`}
      >
        Next
        <ChevronRight size={16} className="ml-1" />
      </Link>
    </div>
  );
}