import { supabase } from "@/shared/lib/supabase";
import type { ContactLead } from "@/domain/contact/contact.types";
import type { ContactCreateInput } from "@/domain/contact/contact.schema";
import type { CustomerRepository } from "@/domain/contact/contact.repository";
import { rowToLead, type SupabaseLeadRow } from "@/domain/contact/contact.mapper";

export class SupabaseCustomerRepository implements CustomerRepository {
  private supabaseClient: any;

  constructor(supabaseClient?: any) {
    this.supabaseClient = supabaseClient || supabase;
  }

  async create(input: ContactCreateInput): Promise<ContactLead> {
    const { data, error } = await this.supabaseClient
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
    return rowToLead(data as SupabaseLeadRow);
  }

  async findMany(): Promise<ContactLead[]> {
    const { data, error } = await this.supabaseClient
      .from("contact_leads")
      .select("*")
      .neq("status", "archived")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`[Supabase] findMany failed: ${error.message}`);
    return (data as SupabaseLeadRow[]).map(rowToLead);
  }

  async findById(id: string): Promise<ContactLead | null> {
    const { data, error } = await this.supabaseClient
      .from("contact_leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(`[Supabase] findById failed: ${error.message}`);
    return data ? rowToLead(data as SupabaseLeadRow) : null;
  }

  async updateStatus(
    id: string,
    status: ContactLead["status"]
  ): Promise<ContactLead> {
    const { data, error } = await this.supabaseClient
      .from("contact_leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`[Supabase] updateStatus failed: ${error.message}`);
    return rowToLead(data as SupabaseLeadRow);
  }

  async updateNotificationStatus(
    id: string,
    notification_status: ContactLead["notificationStatus"]
  ): Promise<ContactLead> {
    const { data, error } = await this.supabaseClient
      .from("contact_leads")
      .update({ notification_status })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw new Error(
        `[Supabase] updateNotificationStatus failed: ${error.message}`
      );
    return rowToLead(data as SupabaseLeadRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabaseClient
      .from("contact_leads")
      .delete()
      .eq("id", id);

    if (error) throw new Error(`[Supabase] delete failed: ${error.message}`);
  }
}
