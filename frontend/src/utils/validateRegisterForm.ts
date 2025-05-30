// import { RegisterFormData } from '../types';

// export const validateRegisterForm = (formData: RegisterFormData): Partial<RegisterFormData> => {
//   const errors: Partial<RegisterFormData> = {};

//   // First Name
//   if (!formData.firstName.trim()) {
//     errors.firstName = 'First name is required';
//   } else if (formData.firstName.length < 2) {
//     errors.firstName = 'First name must be at least 2 characters';
//   }

//   // Last Name
//   if (!formData.lastName.trim()) {
//     errors.lastName = 'Last name is required';
//   } else if (formData.lastName.length < 2) {
//     errors.lastName = 'Last name must be at least 2 characters';
//   }

//   // Phone
//   if (!formData.phone.trim()) {
//     errors.phone = 'Phone number is required';
//   } else if (!/^\d{10}$/.test(formData.phone)) {
//     errors.phone = 'Phone number must be 10 digits';
//   }

//   // Email
//   if (!formData.email.trim()) {
//     errors.email = 'Email is required';
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//     errors.email = 'Invalid email format';
//   }

//   // Date of Birth
//   if (!formData.dob) {
//     errors.dob = 'Date of birth is required';
//   } else {
//     const dob = new Date(formData.dob);
//     const today = new Date();
//     const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
//     if (dob > minAgeDate) {
//       errors.dob = 'You must be at least 18 years old';
//     }
//   }

//   // Password
//   if (!formData.password) {
//     errors.password = 'Password is required';
//   } else if (formData.password.length < 8) {
//     errors.password = 'Password must be at least 8 characters';
//   } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
//     errors.password = 'Password must contain uppercase, lowercase, number, and special character';
//   }

//   // Confirm Password
//   if (!formData.confirmPassword) {
//     errors.confirmPassword = 'Please confirm your password';
//   } else if (formData.confirmPassword !== formData.password) {
//     errors.confirmPassword = 'Passwords do not match';
//   }

//   // Article Preferences
//   if (formData.articlePreferences.length === 0) {
//     errors.articlePreferences = 'Please select at least one article preference';
//   }

//   return errors;
// };



import { RegisterFormData } from '../types';

export const validateRegisterForm = (formData: RegisterFormData): Record<keyof RegisterFormData, string | undefined> => {
  const errors: Record<keyof RegisterFormData, string | undefined> = {
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    email: undefined,
    dob: undefined,
    password: undefined,
    confirmPassword: undefined,
    articlePreferences: undefined,
  };

  // First Name
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Phone
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  // Date of Birth
  if (!formData.dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const dob = new Date(formData.dob);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if (dob > minAgeDate) {
      errors.dob = 'You must be at least 18 years old';
    }
  }

  // Password
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
    errors.password = 'Password must contain uppercase, lowercase, number, and special character';
  }

  // Confirm Password
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Article Preferences
  if (formData.articlePreferences.length === 0) {
    errors.articlePreferences = 'Please select at least one article preference';
  }

  return errors;
};