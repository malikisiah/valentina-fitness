import { z } from "zod"

export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .check(z.email("Invalid email address")),
  notes: z.string().optional(),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
