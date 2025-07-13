import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../auth/authSlice";
import WellnessForm from "../../components/WellnessForm";

const DashboardPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Wellness Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-4">
        <WellnessForm />
      </main>
    </div>
  );
};

export default DashboardPage;
