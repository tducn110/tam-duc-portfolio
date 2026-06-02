import { useState } from "react";
import { updateLeadStatus } from "../api/lead.client";
import type { ContactLead } from "../types";

export function useUpdateLeadStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function update(id: string, status: ContactLead["status"]) {
    setLoading(true);
    setError(null);
    try {
      return await updateLeadStatus(id, status);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to update status";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { update, loading, error };
}
