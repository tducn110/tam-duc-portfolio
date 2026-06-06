import { verifyAdmin } from "../../src/server/lib/auth";
import { LeadRoutes } from "../../src/server/api/lead.routes";
import { DefaultContactService } from "../../src/domain/contact/contact.service";
import { SupabaseCustomerRepository } from "../../src/server/repositories/customer.supabase.repository";
import { supabaseAdmin } from "../../src/server/lib/supabase";
import { MockEmailService } from "../../src/server/services/email.mock.service";

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 1. Verify admin permissions via JWT and Email Allowlist
  const { error, status } = await verifyAdmin(req);
  if (error) {
    return new Response(JSON.stringify({ error }), {
      status,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 2. Initialize dependencies with admin privileges
    const repository = new SupabaseCustomerRepository(supabaseAdmin);
    const contactService = new DefaultContactService(repository, new MockEmailService());
    const leadRoutes = new LeadRoutes(contactService);

    // 3. Handle request using existing route logic
    return await leadRoutes.handleListLeads();
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
