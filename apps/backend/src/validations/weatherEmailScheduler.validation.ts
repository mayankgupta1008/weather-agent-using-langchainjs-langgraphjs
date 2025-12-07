import { z } from "zod";

export const createScheduleSchema = z.object({
  body: z.object({
    city: z.string().min(3, "City must be at least 3 characters long"),
    recipientEmail: z.email("Invalid email address"),
    pattern: z.string().optional().default("0 17 * * *"),
  }),
});

export const deleteScheduleSchema = z.object({
  params: z.object({
    schedulerId: z.string().min(1, "Scheduler ID is required"),
  }),
});
