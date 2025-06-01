import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import VerifyOtpForm from "../components/VerifyOtpForm";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";
import MyArticles from "../components/MyArtcles";
import SettingsPage from "../components/SettingsPage";
import ResetPassword from "../components/ResetPassword";
import ProtectedRoute from "../components/Pages/ProtectedRoute";
// import Dashboard from '../components/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<RegisterForm />} />
      <Route path="/verify-otp" element={<VerifyOtpForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Dashboard />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/my-articles" element={<MyArticles />} />
        <Route path="/settings" element={<ResetPassword />} />
        <Route path="/profile" element={<SettingsPage />} />
      </Route>
      <Route
        path="/success"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                Registration Successful!
              </h2>
              <a href="/login" className="text-blue-600 hover:underline">
                Go to Login
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
