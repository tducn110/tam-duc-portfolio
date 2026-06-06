import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name must be at most 100 characters."),
  email: z.string().email("Invalid email address.").max(254, "Email must be at most 254 characters."),
  phone: z.string().max(30, "Phone number must be at most 30 characters.").optional(),
  serviceType: z.enum(["basic", "standard", "premium", "custom"]),
  budget: z.string().max(100, "Budget must be at most 100 characters.").optional(),
  message: z.string().min(10, "Message must be at least 10 characters.").max(2000, "Message must be at most 2000 characters."),
  website: z.string().optional() // Honeypot field
});

export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
