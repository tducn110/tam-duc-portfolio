import { useEffect, useState } from "react";
import { listLeads } from "../api/lead.client";
import type { ContactLead } from "../types";

export function useLeads() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeads() {
    setLoading(true);
    setError(null);
    try {
      const data = await listLeads();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, loading, error, refetch: fetchLeads };
}
