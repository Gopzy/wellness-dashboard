import React from "react";

interface Props {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel: string;
  isSubmitting: boolean;
}

const AuthFormLayout: React.FC<Props> = ({
  title,
  onSubmit,
  children,
  submitLabel,
  isSubmitting,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">{title}</h2>
        {children}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {isSubmitting ? `${submitLabel}...` : submitLabel}
        </button>
      </form>
    </div>
  );
};

export default AuthFormLayout;
