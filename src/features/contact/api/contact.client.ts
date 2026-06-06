import type { ContactCreateInput } from "@/domain/contact/contact.schema";
import type { ContactLead } from "@/domain/contact/contact.types";

export async function createContactLead(input: ContactCreateInput): Promise<ContactLead> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  if (!res.ok) {
    throw new Error("Failed to submit contact form");
  }

  return res.json();
}
