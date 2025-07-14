import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleTheme } from "../store/reducer/themeSlice";

const ThemeToggle: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="bg-white text-indigo-600 hover:bg-gray-200 p-1.5 rounded-md transition flex items-center justify-center"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
