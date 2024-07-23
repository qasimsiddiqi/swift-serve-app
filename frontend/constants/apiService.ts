import axios from 'axios';

const API_URL = 'http://192.168.1.5:5000/api/auth/';
interface AuthResponse {
  message?: string;
  token?: string;
  error?: string;
}

// Register function
export const register = async (username: string, password: string) => {
  try {
    console.log("register details",username,password)
    // const response = await client.post('/register',{username,password});
    const response = await axios.post(`${API_URL}register`,{username,password});
    console.log("response func",response)
    return response.data;
  } catch (error: any) {
    console.log("Errorrrr",error)
    throw error.response.data;
  }
};

// Login function
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}login`,{username,password});

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