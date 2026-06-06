import type { ContactLead } from "./contact.types";

export type SupabaseLeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_type: "basic" | "standard" | "premium" | "custom";
  budget: string | null;
  message: string;
  status: "new" | "contacted" | "closed" | "rejected" | "archived";
  notification_status: "pending" | "sent" | "failed";
  created_at: string;
  updated_at: string;
};

/** Map Supabase snake_case row → camelCase domain type */
export function rowToLead(row: SupabaseLeadRow): ContactLead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    serviceType: row.service_type,
    budget: row.budget ?? undefined,
    message: row.message,
    status: row.status,
    notificationStatus: row.notification_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
