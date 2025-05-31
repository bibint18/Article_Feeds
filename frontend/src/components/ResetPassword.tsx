
import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';// Assuming axiosInstance is used for API calls
import InputField from './Shared/InputField';
import Button from './Shared/Button';

interface PasswordErrors {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<PasswordErrors>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: PasswordErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    // Validate current password (just ensure it's not empty for now, backend will verify)
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    // Validate new password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword =
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol (@$!%*?&)';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosInstance.patch('/users/reset-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setSuccess('Password updated successfully');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setErrors((prev) => ({
        ...prev,
        currentPassword: error.response?.data?.message || 'Failed to reset password',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div
        className="bg-white p-6 rounded-2xl shadow-xl max-w-lg mx-auto"
        role="main"
        aria-label="Reset Password Page"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Password</h1>
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            error={errors.currentPassword}
            placeholder="Enter current password"
          />
          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            error={errors.newPassword}
            placeholder="Enter new password"
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
            placeholder="Confirm new password"
          />
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;