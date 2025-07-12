export interface SignupResponse {
  token: string;
  user: {
    email: string;
  };
}

/**
 * Simulates an async signup call to a backend and returns a mock JWT.
 */
export const signup = (
  email: string,
  password: string
): Promise<SignupResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Fake user already exists error
      if (email === "existing@example.com") {
        return reject(new Error("Email already in use."));
      }

      // Mock token + user
      resolve({
        token: "mock-jwt-token-1234567890",
        user: { email },
      });
    }, 1000);
  });
};
