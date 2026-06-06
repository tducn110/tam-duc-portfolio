import { supabase } from "@/shared/lib/supabase";
import type { ContactLead } from "@/domain/contact/contact.types";

async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      }
    : {
        "Content-Type": "application/json",
      };
}

export async function listLeads(): Promise<ContactLead[]> {
  const headers = await getAuthHeaders();
  const res = await fetch("/api/leads", { headers });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error || "Failed to list leads");
  }
  return res.json();
}

export async function getLeadDetail(id: string): Promise<ContactLead> {
  const headers = await getAuthHeaders();
  const res = await fetch(`/api/leads/${id}`, { headers });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error || "Failed to fetch lead details");
  }
  return res.json();
}

export async function updateLeadStatus(id: string, status: ContactLead["status"]): Promise<ContactLead> {
  const headers = await getAuthHeaders();
  const res = await fetch(`/api/leads/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error || "Failed to update lead status");
  }
  return res.json();
}

export async function deleteLead(id: string): Promise<void> {
  const headers = await getAuthHeaders();
  const res = await fetch(`/api/leads/${id}`, {
    method: "DELETE",
    headers
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error || "Failed to delete lead");
  }
}
