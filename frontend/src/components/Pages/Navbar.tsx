import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import { clearUser } from "../../redux/slices/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">ArticleHub</div>
        {user && (
          <div className="flex space-x-6 items-center">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:text-gray-200 transition-colors duration-200 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `hover:text-gray-200 transition-colors duration-200 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
             Profile
            </NavLink>
            <NavLink
              to="/my-articles"
              className={({ isActive }) =>
                `hover:text-gray-200 transition-colors duration-200 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              My Articles
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `hover:text-gray-200 transition-colors duration-200 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              Settings
            </NavLink>

            <button
              onClick={handleLogout}
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
