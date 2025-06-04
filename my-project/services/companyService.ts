import axios from 'axios';

const API_URL = 'https://your-backend-api.com/companies'; // Replace with your actual backend URL

// Define a type for company data
interface CompanyData {
  name: string;
  location: string;
  // Add other company fields as needed
}

// Fetch all companies
export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data; // Returning list of companies
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch companies');
    }
    throw new Error('Failed to fetch companies');
  }
};

// Fetch company details by ID
export const fetchCompanyById = async (companyId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${companyId}`);
    return response.data; // Returning company details
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch company details');
    }
    throw new Error('Failed to fetch company details');
  }
};

// Create a new company (if applicable in your system)
export const createCompany = async (companyData: CompanyData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, companyData);
    return response.data; // Returning created company details
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to create company');
    }
    throw new Error('Failed to create company');
  }
};
