import React, { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/reducer/authSlice";
import WellnessForm from "../components/WellnessForm";
import LoadingWrapper from "../components/LoadingWrapper";
import { loadLogs } from "../store/reducer/logSlice";
import ThemeToggle from "../components/ThemeToggle";

const LogTable = lazy(() => import("../components/LogTable"));

const DashboardPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const isLogTableLoading = useAppSelector(
    (state) => state.ui.loadingComponents["LogTable"]
  );

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
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Wellness Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}

          <span className="text-sm">{user?.email}</span>
          <ThemeToggle />
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

        {/* Table for displaying logs, Lazy loaded */}

        <Suspense
          fallback={<div className="text-center mt-4">Loading logs...</div>}
        >
          <LoadingWrapper componentName="LogTable">
            <LogTable />
          </LoadingWrapper>
        </Suspense>
        {isLogTableLoading ? (
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg">
            Loading logs...
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default DashboardPage;
