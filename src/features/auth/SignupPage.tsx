import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "./signupSchema";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { setCredentials } from "./authSlice";
import { signup } from "../../api/auth";
import AuthFormLayout from "../../components/AuthFormLayout";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await signup(data.email, data.password);

      // Dispatch token and user to Redux
      dispatch(setCredentials(result));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <AuthFormLayout
      title="Create Account"
      onSubmit={handleSubmit(onSubmit)}
      submitLabel="Sign Up"
      isSubmitting={isSubmitting}
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </AuthFormLayout>
  );
};

export default SignupPage;
