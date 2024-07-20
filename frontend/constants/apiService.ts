import axios from 'axios';

const API_URL = 'http://192.168.1.5:5000/api/';
interface AuthResponse {
  message?: string;
  token?: string;
  error?: string;
}

// Register function
// const { email, fullName, password, accountType,categories,image } = req.body;

export const register = async (email: any, fullName: any, password: any, accountType: any, categories: any, image: any) => {
  try {
    console.log("Register details:", email, password);
    const response = await axios.post(`${API_URL}users/register`, { email, fullName, password, accountType, categories, image });
    console.log("Response:", response);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error); // Log the error
    throw error.response?.data || error.message;
  }
};

// Login function
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}users/login`,{username,password});

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};



export const createAdsPost = async (adsPost:any) => {
  try {
    const response = await axios.post(`${API_URL}ads/create`, adsPost);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create ads post');
  }
};