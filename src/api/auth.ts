import { api } from "./axios";

export interface SignupResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export const signup = async (
  email: string,
  password: string
): Promise<SignupResponse> => {
  // Check if user already exists
  const existing = await api.get(`/users?email=${email}`);
  if (existing.data.length > 0) {
    throw new Error("Email already exists");
  }

  // Create new user
  const response = await api.post("/users", { email, password });

  return {
    token: "mock-token-" + Date.now(),
    user: response.data,
  };
};

export const login = async (
  email: string,
  password: string
): Promise<SignupResponse> => {
  const response = await api.get(`/users?email=${email}`);
  const user = response.data[0];

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  return {
    token: "mock-token-" + Date.now(),
    user,
  };
};
