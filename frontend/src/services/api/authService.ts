import axiosInstance from '../axiosInstance';
import { LoginFormData, RegisterFormData, VerifyOtpData } from '../../types';

export const registerUser = async (data: RegisterFormData) => {
  console.log("hereeeee frm api")
  const response = await axiosInstance.post('/auth/register', data);
  console.log(response.data)
  return response.data;
};

export const verifyOtp = async (data: VerifyOtpData) => {
  const response = await axiosInstance.post('/auth/verify-otp', data);
  return response.data;
};

export const resendOtp = async (data: { email: string }) => {
  const response = await axiosInstance.post('/auth/resend-otp', data);
  return response.data;
};

export const loginUser = async (data: LoginFormData)=> {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};