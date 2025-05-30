export interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  password: string;
  confirmPassword: string;
  articlePreferences: string[];
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}