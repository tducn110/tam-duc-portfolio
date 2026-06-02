import { supabase } from "@/shared/lib/supabase";
import type { ContactLead } from "@/features/contact/types";
import type { ContactCreateInput } from "@/features/contact/schemas/contact.schema";
import type { CustomerRepository } from "./customer.repository";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_type: "basic" | "standard" | "premium" | "custom";
  budget: string | null;
  message: string;
  status: "new" | "contacted" | "closed" | "rejected";
  notification_status: "pending" | "sent" | "failed";
  created_at: string;
  updated_at: string;
};

/** Map Supabase snake_case row → camelCase domain type */
function rowToLead(row: Row): ContactLead {
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

export class SupabaseCustomerRepository implements CustomerRepository {
  async create(input: ContactCreateInput): Promise<ContactLead> {
    const { data, error } = await supabase
      .from("contact_leads")
      .insert({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        service_type: input.serviceType,
        budget: input.budget ?? null,
        message: input.message,
      })
      .select()
      .single();

    if (error) throw new Error(`[Supabase] create failed: ${error.message}`);
    return rowToLead(data as Row);
  }

  async findMany(): Promise<ContactLead[]> {
    const { data, error } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`[Supabase] findMany failed: ${error.message}`);
    return (data as Row[]).map(rowToLead);
  }

  async findById(id: string): Promise<ContactLead | null> {
    const { data, error } = await supabase
      .from("contact_leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(`[Supabase] findById failed: ${error.message}`);
    return data ? rowToLead(data as Row) : null;
  }

  async updateStatus(
    id: string,
    status: ContactLead["status"]
  ): Promise<ContactLead> {
    const { data, error } = await supabase
      .from("contact_leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`[Supabase] updateStatus failed: ${error.message}`);
    return rowToLead(data as Row);
  }

  async updateNotificationStatus(
    id: string,
    notification_status: ContactLead["notificationStatus"]
  ): Promise<ContactLead> {
    const { data, error } = await supabase
      .from("contact_leads")
      .update({ notification_status })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw new Error(
        `[Supabase] updateNotificationStatus failed: ${error.message}`
      );
    return rowToLead(data as Row);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("contact_leads")
      .delete()
      .eq("id", id);

    if (error) throw new Error(`[Supabase] delete failed: ${error.message}`);
  }
}
