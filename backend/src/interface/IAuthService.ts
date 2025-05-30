import { IUser } from './IUser';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  password: string;
  confirmPassword: string;
  articlePreferences: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface IAuthService {
  register(data: RegisterRequest): Promise<{ userData: RegisterRequest; otp: string }>;
  verifyOtp(email: string, otp: string): Promise<IUser>;
  resendOtp(email: string): Promise<{ userData: RegisterRequest; otp: string }>;
  login(data: LoginRequest): Promise<{ user: Partial<IUser>; accessToken: string; refreshToken: string }>;
}