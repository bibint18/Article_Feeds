// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import InputField from './Shared/InputField';
// import SelectField from './Shared/SelectField';
// import Button from './Shared/Button';
// import { registerUser } from '../services/api/authService';
// import { RegisterFormData } from '../types';

// const RegisterForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<RegisterFormData>({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     dob: '',
//     password: '',
//     confirmPassword: '',
//     articlePreferences: [],
//   });
//   const [error, setError] = useState<string>('');

//   const categories = ['Technology', 'Health', 'Sports', 'News'];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
//     setFormData((prev) => ({ ...prev, articlePreferences: selectedOptions }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       navigate('/verify-otp', { state: { email: formData.email, userData: formData } });
//     } catch (err: unknown) {
//       setError(err instanceof Error? err.message : 'Registration failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <InputField
//           label="First Name"
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           label="Last Name"
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           label="Phone"
//           type="tel"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           label="Email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           label="Date of Birth"
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           label="Password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           label="Confirm Password"
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//         />
//         <SelectField
//           label="Article Preferences"
//           name="articlePreferences"
//           value={formData.articlePreferences}
//           options={categories}
//           onChange={handleSelectChange}
//         />
//         <Button type="submit">Register</Button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./Shared/InputField";
import SelectField from "./Shared/SelectField";
import Button from "./Shared/Button";
import { registerUser } from "../services/api/authService";
import { RegisterFormData } from "../types";
import { validateRegisterForm } from "../utils/validateRegisterForm";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    articlePreferences: [],
  });
  const [errors, setErrors] = useState<
    Record<keyof RegisterFormData, string | undefined>
  >({
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    email: undefined,
    dob: undefined,
    password: undefined,
    confirmPassword: undefined,
    articlePreferences: undefined,
  });
  const categories = ["Technology", "Health", "Sports", "News"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, articlePreferences: selectedOptions }));
    setErrors((prev) => ({ ...prev, articlePreferences: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    console.log("validation err", validationErrors);
    // if (Object.keys(validationErrors).length > 0) {
    //   console.log("result",Object.keys(validationErrors).length > 0)
    //   setErrors(validationErrors);
    //   return;
    // }
    const hasErrors = Object.values(validationErrors).some(
      (val) => val !== undefined && val !== ""
    );
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser(formData);
      console.log("HEREEEEE");
      navigate("/verify-otp", {
        state: { email: formData.email, userData: formData },
      });
    } catch (err: any) {
      setErrors({
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        email: err.response?.data?.message || "Registration failed",
        dob: undefined,
        password: undefined,
        confirmPassword: undefined,
        articlePreferences: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md md:max-w-lg transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            error={errors.firstName}
            placeholder="Enter your first name"
          />
          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            error={errors.lastName}
            placeholder="Enter your last name"
          />
          <InputField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone}
            placeholder="Enter your phone number"
          />
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
            placeholder="Enter your email"
          />
          <InputField
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            error={errors.dob}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
            placeholder="Create a password"
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />
          <SelectField
            label="Article Preferences (Hold Ctrl/Cmd to select multiple)"
            name="articlePreferences"
            value={formData.articlePreferences}
            options={categories}
            onChange={handleSelectChange}
            error={errors.articlePreferences}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Register
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
