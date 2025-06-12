'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/component/common/Button';
import { InputField } from '@/component/common/InputField';
import { Search, SlidersHorizontal } from 'lucide-react';

// Tipe data untuk form filter
type FilterInputs = {
  keyword: string;
  location: string;
  category: string;
};

interface JobFilterProps {
    onFilter: (filters: FilterInputs) => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({ onFilter }) => {
  const { register, handleSubmit, reset } = useForm<FilterInputs>();

  const onSubmit: SubmitHandler<FilterInputs> = (data) => {
    onFilter(data);
  };

  const handleReset = () => {
    reset();
    onFilter({ keyword: '', location: '', category: '' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <SlidersHorizontal size={20} />
        Filter Pekerjaan
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Kata Kunci"
          id="keyword"
          placeholder="Judul, perusahaan..."
          {...register('keyword')}
        />
        <InputField
          label="Lokasi"
          id="location"
          placeholder="Jakarta, Bandung..."
          {...register('location')}
        />
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            id="category"
            {...register('category')}
            className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Pemasaran">Pemasaran</option>
            <option value="Desain">Desain</option>
            <option value="Penjualan">Penjualan</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button type="submit" className="w-full">
            <Search size={16} className="mr-2" /> Terapkan Filter
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset} className="w-full">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};