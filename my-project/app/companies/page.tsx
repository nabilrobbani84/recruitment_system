import React from "react";
import Link from "next/link"; // 1. Impor komponen Link

// Mock data (replace with actual API call or dynamic data)
const companies = [
  { id: 1, name: "ABC Corp", description: "Leading tech company in Indonesia." },
  { id: 2, name: "XYZ Ltd", description: "Global provider of financial solutions." },
  { id: 3, name: "Telecom Innovations", description: "Telecommunication and tech solutions." },
];

const Companies = () => {
  // 2. Tidak perlu lagi useRouter atau fungsi handler
  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Companies</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          // 3. Bungkus kartu dengan komponen Link
          <Link href={`/companies/${company.id}`} key={company.id} className="block">
            <div
              className="border p-4 h-full rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-blue-600">{company.name}</h2>
              <p className="mt-2 text-gray-600">{company.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Companies;