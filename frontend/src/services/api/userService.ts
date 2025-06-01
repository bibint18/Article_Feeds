import axiosInstance from "../axiosInstance";

interface UserProfile {
  _id:string
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string; // ISO date string
  articlePreferences: Category[];
}

interface Category {
  _id: string;
  name: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (data: {
  firstName: string;
  lastName: string;
  dob: string;
  articlePreferences:string[]
}): Promise<void> => {
  await axiosInstance.patch('/users/profile', data);
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get('/users/categories');
  console.log(response.data,response)
  return response.data;
};