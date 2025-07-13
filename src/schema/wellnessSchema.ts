import { z } from "zod";

export const wellnessSchema = z.object({
  mood: z.enum(["Happy", "Stressed", "Tired", "Focused"], {
    required_error: "Mood is required",
  }),
  sleepHours: z.coerce
    .number()
    .min(0, "Sleep must be at least 0 hours")
    .max(12, "Sleep can't exceed 12 hours"),
  notes: z
    .string()
    .max(200, "Activity notes must be under 200 characters")
    .optional(),
});

export type WellnessFormData = z.infer<typeof wellnessSchema>;
