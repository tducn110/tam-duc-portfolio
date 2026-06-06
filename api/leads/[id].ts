import { verifyAdmin } from "../../src/server/lib/auth";
import { LeadRoutes } from "../../src/server/api/lead.routes";
import { DefaultContactService } from "../../src/domain/contact/contact.service";
import { SupabaseCustomerRepository } from "../../src/server/repositories/customer.supabase.repository";
import { supabaseAdmin } from "../../src/server/lib/supabase";
import { MockEmailService } from "../../src/server/services/email.mock.service";

export default async function handler(req: Request) {
  const method = req.method;
  if (method !== "PATCH" && method !== "DELETE") {
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

  // 2. Parse lead ID from the URL path
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  if (!id) {
    return new Response(JSON.stringify({ error: "Lead ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 3. Initialize dependencies with admin privileges
    const repository = new SupabaseCustomerRepository(supabaseAdmin);
    const contactService = new DefaultContactService(repository, new MockEmailService());
    const leadRoutes = new LeadRoutes(contactService);

    // 4. Handle based on HTTP method
    if (method === "PATCH") {
      // Validate that status is in correct enum
      const reqClone = req.clone();
      const body = await reqClone.json().catch(() => ({}));
      const allowedStatuses = ["new", "contacted", "closed", "rejected", "archived"];
      if (!body.status || !allowedStatuses.includes(body.status)) {
        return new Response(JSON.stringify({ error: "Invalid status value" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      return await leadRoutes.handleUpdateLeadStatus(req, { id });
    }

    if (method === "DELETE") {
      return await leadRoutes.handleDeleteLead({ id });
    }

    return new Response("Not found", { status: 404 });
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
