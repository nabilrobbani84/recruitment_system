// src/components/company/CompanyCard.tsx
import React from "react";
import { useRouter } from "next/router";

interface CompanyCardProps {
  companyId: string;
  companyName: string;
  companyDescription: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ companyId, companyName, companyDescription }) => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/companies/${companyId}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold">{companyName}</h3>
      <p className="text-gray-600">{companyDescription}</p>
      <button
        onClick={handleViewProfile}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Profile
      </button>
    </div>
  );
};

export default CompanyCard;
