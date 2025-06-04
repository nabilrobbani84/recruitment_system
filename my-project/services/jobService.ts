import axios from 'axios';

const API_URL = 'https://your-backend-api.com/jobs'; // Replace with your actual backend URL

// Define the JobData type
interface JobData {
  title: string;
  description: string;
  location: string;
  // Add other job-related fields here
}

// Fetch all job listings
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data; // Returning the list of jobs
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch jobs');
    }
    throw new Error('Failed to fetch jobs');
  }
};

// Fetch a specific job by ID
export const fetchJobById = async (jobId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data; // Returning the specific job details
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch job details');
    }
    throw new Error('Failed to fetch job details');
  }
};

// Create a new job
export const createJob = async (jobData: JobData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, jobData);
    return response.data; // Returning created job details
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to create job');
    }
    throw new Error('Failed to create job');
  }
};
