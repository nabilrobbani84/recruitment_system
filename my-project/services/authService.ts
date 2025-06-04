import axios from 'axios';
import { auth } from '../app/lib/firebase';

const API_URL = 'https://your-backend-api.com/auth'; // Replace with your actual backend URL

// Login service
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Returning response data (e.g., user info, token)
  } catch (error: unknown) {
    if (error instanceof Error) {
      // TypeScript now knows that error is an instance of Error
      throw new Error(error.message || 'Login failed');
    }
    // If error isn't an instance of Error, just throw a generic message
    throw new Error('Login failed');
  }
};

// Register service
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
};

// Logout service
export const logoutUser = async () => {
  try {
    await auth.signOut(); // Firebase sign out
    // Additional backend sign out logic can go here
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Logout failed');
    }
    throw new Error('Logout failed');
  }
};
