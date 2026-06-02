import type { ContactLead } from "@/features/contact/types";
import type { EmailService } from "./email.service";

export class MockEmailService implements EmailService {
  async sendLeadNotification(lead: ContactLead): Promise<void> {
    console.log(`[EmailService] Sending notification for lead ${lead.id}:`, lead);
    // Simulating API network call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}
