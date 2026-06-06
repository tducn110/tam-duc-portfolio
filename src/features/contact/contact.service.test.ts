import { describe, it, expect, vi, beforeEach } from "vitest";
import { DefaultContactService } from "@/domain/contact/contact.service";
import { MemoryCustomerRepository } from "../../server/repositories/customer.memory.repository";
import type { EmailService } from "../../server/services/email.service";
import type { ContactLead } from "@/domain/contact/contact.types";

// ── Helpers ──────────────────────────────────────────────────────────────────

const makeInput = (overrides = {}) => ({
  name: "Test User",
  email: "test@example.com",
  serviceType: "standard" as const,
  message: "I need a landing page for my business.",
  ...overrides,
});

const makeEmailService = (shouldFail = false): EmailService => ({
  sendLeadNotification: vi.fn(async (lead: ContactLead) => {
    if (shouldFail) throw new Error("SMTP connection timeout");
    console.log("[Test Email] sent for", lead.id);
  }),
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("DefaultContactService", () => {
  let repo: MemoryCustomerRepository;
  let service: DefaultContactService;
  let email: EmailService;

  beforeEach(() => {
    repo = new MemoryCustomerRepository();
    email = makeEmailService();
    service = new DefaultContactService(repo, email);
  });

  it("creates a lead with status=new", async () => {
    const lead = await service.createLead(makeInput());
    expect(lead.id).toBeTruthy();
    expect(lead.name).toBe("Test User");
    expect(lead.status).toBe("new");
  });

  it("marks notificationStatus=sent when email succeeds", async () => {
    const lead = await service.createLead(makeInput());
    expect(lead.notificationStatus).toBe("sent");
  });

  it("marks notificationStatus=failed when email throws — lead is NOT lost", async () => {
    const failEmail = makeEmailService(true);
    const failService = new DefaultContactService(repo, failEmail);
    const lead = await failService.createLead(makeInput());
    // Lead is saved
    expect(lead.id).toBeTruthy();
    expect(lead.status).toBe("new");
    // But email failed
    expect(lead.notificationStatus).toBe("failed");
  });

  it("lists all leads", async () => {
    await service.createLead(makeInput({ name: "Alice" }));
    await service.createLead(makeInput({ name: "Bob" }));
    const leads = await service.listLeads();
    expect(leads).toHaveLength(2);
  });

  it("updates lead status", async () => {
    const lead = await service.createLead(makeInput());
    const updated = await service.updateLeadStatus(lead.id, "contacted");
    expect(updated.status).toBe("contacted");
  });

  it("deletes a lead", async () => {
    const lead = await service.createLead(makeInput());
    await service.deleteLead(lead.id);
    const leads = await service.listLeads();
    expect(leads).toHaveLength(0);
  });

  it("throws when updating status of unknown id", async () => {
    await expect(
      service.updateLeadStatus("non-existent-id", "closed")
    ).rejects.toThrow("Lead not found");
  });
});
