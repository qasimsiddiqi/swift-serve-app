import axios from 'axios';

const API_URL = 'http://192.168.0.118:5000/api/';
interface AuthResponse {
  message?: string;
  token?: string;
  error?: string;
  user?: any;
}

// Register function
// const { email, fullName, password, accountType,categories,image } = req.body;

export const register = async (email: any, fullName: any, password: any, accountType: any, categories: any, image: any) => {
  try {
    // console.log("Register details:", email, password);
    const response = await axios.post(`${API_URL}users/register`, { email, fullName, password, accountType, categories, image });
    return response;
  } catch (error: any) {
    console.error("Error:", error); // Log the error
    throw error.response?.data || error.message;
  }
};

// Login function
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // console.log("inside login function", email, password)
    const response = await axios.post(`${API_URL}users/login`, { email, password });
    // console.log("Login-------Res", response)
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};



export const createAdsPost = async (adsPost: any) => {
  try {
    // console.log("inside post function", adsPost)
    const response = await axios.post(`${API_URL}ads/create`, adsPost);
    // console.log("Ads post created successfully:", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create ads post');
  }
};

export const getAdsPost = async () => {
  try {
    // console.log("inside post function", adsPost)
    const response = await axios.get(`${API_URL}ads`);
    // console.log("Ads post created successfully:", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create ads post');
  }
};

export const createBooking = async (bookingDetails: any) => {
  try {
    console.log("inside booking function", bookingDetails)
    const response = await axios.post(`${API_URL}bookings/create`, bookingDetails);
    // console.log("Ads post created successfully:", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create ads post');
  }
};

export const createReview = async (reviewDetails: any) => {
  try {
    console.log("inside review function", reviewDetails)
    const response = await axios.post(`${API_URL}reviews/create`, reviewDetails);
    // console.log("Ads post created successfully:", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create review');
  }
};