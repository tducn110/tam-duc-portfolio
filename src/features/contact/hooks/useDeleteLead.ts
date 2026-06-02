import { useState } from "react";
import { deleteLead } from "../api/lead.client";

export function useDeleteLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove(id: string) {
    setLoading(true);
    setError(null);
    try {
      await deleteLead(id);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to delete lead";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { remove, loading, error };
}
