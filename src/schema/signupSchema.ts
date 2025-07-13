import { z } from "zod";

/**
 * Validation schema for signup form
 */
export const signupSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // error is shown under confirmPassword field
  });

/**
 * Inferred TypeScript type from the schema
 */
export type SignupFormData = z.infer<typeof signupSchema>;
