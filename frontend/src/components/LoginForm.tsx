import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputField from './Shared/InputField';
import Button from './Shared/Button';
import { loginUser } from '../services/api/authService';
import { validateLoginForm } from '../utils/validateLoginForm';
import { setUser } from '../redux/slices/authSlice';
import { LoginFormData } from '../types';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<keyof LoginFormData, string | undefined>>({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    const hasErrors = Object.values(validationErrors).some(
      (val) => val !== undefined && val !== ""
    );
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }
    // if (Object.keys(validationErrors).length > 0) {
    //   console.log(Object.keys(validationErrors).length > 0)
    //   setErrors(validationErrors);
    //   return;
    // }

    try {
      const { user, accessToken, refreshToken } = await loginUser(formData);
      console.log("respomse",user,accessToken,refreshToken)
      dispatch(setUser({ user, accessToken, refreshToken }));
      navigate('/dashboard');
    } catch (err: any) {
      setErrors({
        email: undefined,
        password: err.response?.data?.message || 'Login failed',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md md:max-w-lg transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
            Log In
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account? <a href="/" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;