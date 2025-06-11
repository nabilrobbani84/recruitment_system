import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Logika untuk menampilkan nomor halaman (misal: 1 ... 4 5 6 ... 10)
  // Untuk kesederhanaan, contoh ini hanya menampilkan info dasar.
  
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between" aria-label="Pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
        <span>Sebelumnya</span>
      </button>

      <div className="hidden md:block">
        <p className="text-sm text-gray-700">
          Halaman <span className="font-medium">{currentPage}</span> dari{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        <span>Berikutnya</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export { Pagination };