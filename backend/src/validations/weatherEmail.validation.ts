import { z } from "zod";

export const createWeatherEmailSchema = z.object({
  city: z.string().min(1, "City is required"),
  recipientEmail: z.string().email("Invalid email address"),
  enabled: z.boolean().optional(),
});

export const updateWeatherEmailSchema = z.object({
  city: z.string().min(1, "City is required").optional(),
  recipientEmail: z.string().email("Invalid email address").optional(),
  enabled: z.boolean().optional(),
});
