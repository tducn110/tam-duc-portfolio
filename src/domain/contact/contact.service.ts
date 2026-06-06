import type { ContactLead } from "./contact.types";
import type { ContactCreateInput } from "./contact.schema";
import type { CustomerRepository } from "./contact.repository";
import type { EmailService } from "../../server/services/email.service";

export interface ContactService {
  createLead(input: ContactCreateInput): Promise<ContactLead>;
  updateLeadStatus(id: string, status: ContactLead["status"]): Promise<ContactLead>;
  listLeads(): Promise<ContactLead[]>;
  deleteLead(id: string): Promise<void>;
}

export class DefaultContactService implements ContactService {
  constructor(
    private customers: CustomerRepository,
    private email: EmailService
  ) {}

  async createLead(input: ContactCreateInput): Promise<ContactLead> {
    const lead = await this.customers.create(input);
    try {
      await this.email.sendLeadNotification(lead);
      return await this.customers.updateNotificationStatus(lead.id, "sent");
    } catch (err) {
      console.error(`Failed to send email for lead ${lead.id}:`, err);
      return await this.customers.updateNotificationStatus(lead.id, "failed");
    }
  }

  async updateLeadStatus(id: string, status: ContactLead["status"]): Promise<ContactLead> {
    return this.customers.updateStatus(id, status);
  }

  async listLeads(): Promise<ContactLead[]> {
    return this.customers.findMany();
  }

  async deleteLead(id: string): Promise<void> {
    await this.customers.updateStatus(id, "archived");
  }
}
