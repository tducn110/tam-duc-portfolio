import type { ContactLead } from "../../domain/contact/contact.types";
import type { ContactCreateInput } from "../../domain/contact/contact.schema";
import type { CustomerRepository } from "../../domain/contact/contact.repository";

export class MemoryCustomerRepository implements CustomerRepository {
  // Instance-level store — each new() gets its own isolated array.
  // This fixes test pollution where a module-level `let leadsStore` bleeds across tests.
  private store: ContactLead[] = [];

  async create(input: ContactCreateInput): Promise<ContactLead> {
    const lead: ContactLead = {
      id: Math.random().toString(36).substring(2, 9),
      name: input.name,
      email: input.email,
      phone: input.phone,
      serviceType: input.serviceType,
      budget: input.budget,
      message: input.message,
      status: "new",
      notificationStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.store.push(lead);
    return { ...lead };
  }

  async findMany(): Promise<ContactLead[]> {
    return this.store
      .filter((l) => l.status !== "archived")
      .map((l) => ({ ...l }));
  }

  async findById(id: string): Promise<ContactLead | null> {
    const lead = this.store.find((l) => l.id === id);
    return lead ? { ...lead } : null;
  }

  async updateStatus(id: string, status: ContactLead["status"]): Promise<ContactLead> {
    const index = this.store.findIndex((l) => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    this.store[index] = {
      ...this.store[index],
      status,
      updatedAt: new Date().toISOString()
    };
    return { ...this.store[index] };
  }

  async updateNotificationStatus(id: string, status: ContactLead["notificationStatus"]): Promise<ContactLead> {
    const index = this.store.findIndex((l) => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    this.store[index] = {
      ...this.store[index],
      notificationStatus: status,
      updatedAt: new Date().toISOString()
    };
    return { ...this.store[index] };
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter((l) => l.id !== id);
  }
}
