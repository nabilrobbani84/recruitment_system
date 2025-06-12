import React from 'react';
import { Search } from 'lucide-react';
import { InputField } from './InputField'; // Menggunakan kembali InputField

// --- Tipe Props ---
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  containerClassName?: string;
}

// --- Komponen ---
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  containerClassName,
  placeholder = "Cari...",
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.currentTarget.value);
    }
  };

  return (
    <div className={`relative w-full ${containerClassName}`}>
      <InputField
        label="" // Label dikosongkan karena bersifat visual
        type="search"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        icon={<Search />}
        className="pr-10" // Beri ruang untuk tombol search jika ada
        {...props}
      />
      {/* Tombol search bisa ditambahkan di sini jika diperlukan */}
    </div>
  );
};

export { SearchBar };