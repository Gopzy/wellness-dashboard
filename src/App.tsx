import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import DashboardPage from "./features/wellness/DashboardPage";
import "./App.css";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
