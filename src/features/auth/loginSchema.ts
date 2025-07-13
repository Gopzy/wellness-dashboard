import { z } from "zod";

/**
 * Validation schema for login form
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Inferred TypeScript type from the schema
 */
export type LoginFormData = z.infer<typeof loginSchema>;
