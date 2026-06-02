import type { ContactLead } from "@/features/contact/types";
import type { ContactCreateInput } from "@/features/contact/schemas/contact.schema";

export interface CustomerRepository {
  create(input: ContactCreateInput): Promise<ContactLead>;
  findMany(): Promise<ContactLead[]>;
  findById(id: string): Promise<ContactLead | null>;
  updateStatus(id: string, status: ContactLead["status"]): Promise<ContactLead>;
  updateNotificationStatus(id: string, status: ContactLead["notificationStatus"]): Promise<ContactLead>;
  delete(id: string): Promise<void>;
}
