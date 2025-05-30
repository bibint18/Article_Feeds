import { LoginFormData } from '../types';

export const validateLoginForm = (formData: LoginFormData): Record<keyof LoginFormData, string | undefined> => {
  const errors: Record<keyof LoginFormData, string | undefined> = {
    email: undefined,
    password: undefined,
  };

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  }

  return errors;
};