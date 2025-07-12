import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../auth/authSlice";

const DashboardPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email}</h1>
      <p className="mb-8">You're now on the protected dashboard page 🎉</p>
      <button
        onClick={handleLogout}
        className="bg-white text-indigo-600 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
