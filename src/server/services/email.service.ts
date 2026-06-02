import type { ContactLead } from "@/features/contact/types";

export interface EmailService {
  sendLeadNotification(lead: ContactLead): Promise<void>;
}
