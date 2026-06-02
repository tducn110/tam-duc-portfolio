import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  serviceType: z.enum(["basic", "standard", "premium", "custom"]),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
