import { ContactRoutes } from "../src/server/api/contact.routes";
import { DefaultContactService } from "../src/domain/contact/contact.service";
import { SupabaseCustomerRepository } from "../src/server/repositories/customer.supabase.repository";
import { ResendEmailService } from "../src/server/services/email.resend.service";
import { MockEmailService } from "../src/server/services/email.mock.service";
import { supabaseAdmin } from "../src/server/lib/supabase";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 1. Honeypot check
    const reqClone = req.clone();
    const body = await reqClone.json().catch(() => ({}));
    if (body.website && body.website.trim() !== "") {
      console.warn("[Serverless] Honeypot field filled by bot. Silently ignoring.");
      return new Response(null, { status: 204 });
    }

    // 2. Initialize dependencies with admin privileges
    const repository = new SupabaseCustomerRepository(supabaseAdmin);
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailService = resendApiKey
      ? new ResendEmailService(resendApiKey)
      : new MockEmailService();

    const contactService = new DefaultContactService(repository, emailService);
    const contactRoutes = new ContactRoutes(contactService);

    // 3. Handle request using existing route logic
    return await contactRoutes.handleCreateLead(req);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
export const config = {
  runtime: "edge",
};
