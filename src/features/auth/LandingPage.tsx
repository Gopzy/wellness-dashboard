import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 text-center px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">
        Welcome to Wellness Tracker
      </h1>
      <p className="text-gray-700 mb-10 max-w-md">
        Track your mood, sleep, and wellbeing with ease. Start by logging in or
        creating a new account.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
