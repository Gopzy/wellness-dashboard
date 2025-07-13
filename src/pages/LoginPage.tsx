import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setCredentials } from "../store/reducer/authSlice";
import AuthFormLayout from "../components/AuthFormLayout";
import { loginSchema } from "../schema/loginSchema";
import { login } from "../api/auth";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password);
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <AuthFormLayout
      title="Login"
      onSubmit={handleSubmit(onSubmit)}
      submitLabel="Login"
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
    </AuthFormLayout>
  );
};

export default LoginPage;
