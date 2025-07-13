import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../auth/authSlice";
import WellnessForm from "../../components/WellnessForm";
import { loadLogs } from "./logSlice";
import LogTable from "../../components/LogTable";

const DashboardPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      dispatch(loadLogs({ userId: user.id, token }));
    }
  }, [user, token, dispatch]);

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

      <main className="p-4 space-y-6">
        {/* Form for adding new logs */}
        <WellnessForm />

        {/* Table for displaying logs */}
        <LogTable />
      </main>
    </div>
  );
};

export default DashboardPage;
