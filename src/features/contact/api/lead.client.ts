import type { ContactLead } from "../types";

export async function listLeads(): Promise<ContactLead[]> {
  const res = await fetch("/api/leads");
  if (!res.ok) throw new Error("Failed to list leads");
  return res.json();
}

export async function getLeadDetail(id: string): Promise<ContactLead> {
  const res = await fetch(`/api/leads/${id}`);
  if (!res.ok) throw new Error("Failed to fetch lead details");
  return res.json();
}

export async function updateLeadStatus(id: string, status: ContactLead["status"]): Promise<ContactLead> {
  const res = await fetch(`/api/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Failed to update lead status");
  return res.json();
}

export async function deleteLead(id: string): Promise<void> {
  const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete lead");
}
