import { useState } from "react";
import { createContactLead } from "../api/contact.client";
import type { ContactCreateInput } from "../schemas/contact.schema";

export function useCreateContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submit(input: ContactCreateInput) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await createContactLead(input);
      setSuccess(true);
      return data;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Cannot send contact request right now.";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, success };
}
