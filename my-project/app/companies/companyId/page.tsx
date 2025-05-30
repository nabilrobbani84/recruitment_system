import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Mock data (replace with actual API call or dynamic data)
const companyData = [
  { id: 1, name: "ABC Corp", description: "Leading tech company in Indonesia.", location: "Jakarta", jobs: ["Software Engineer", "UI/UX Designer"] },
  { id: 2, name: "XYZ Ltd", description: "Global provider of financial solutions.", location: "Surabaya", jobs: ["Financial Analyst", "Project Manager"] },
  { id: 3, name: "Telecom Innovations", description: "Telecommunication and tech solutions.", location: "Bandung", jobs: ["Network Engineer", "Data Scientist"] },
];

const CompanyProfile = () => {
  const router = useRouter();
  const { companyId } = router.query;
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (companyId) {
      // Fetch company details based on companyId
      const selectedCompany = companyData.find((comp) => comp.id === parseInt(companyId as string));
      setCompany(selectedCompany);
    }
  }, [companyId]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">{company.name}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">About {company.name}</h2>
        <p className="mt-2 text-gray-600">{company.description}</p>
        <p className="mt-2 text-gray-600"><strong>Location:</strong> {company.location}</p>
        
        <h3 className="mt-6 text-lg font-semibold">Job Openings:</h3>
        <ul className="mt-2 space-y-2">
          {company.jobs.map((job, index) => (
            <li key={index} className="text-blue-500 cursor-pointer">{job}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyProfile;
