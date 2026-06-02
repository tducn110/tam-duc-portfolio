import { SupabaseCustomerRepository } from "./repositories/customer.supabase.repository";
import { MockEmailService } from "./services/email.mock.service";
import { ResendEmailService } from "./services/email.resend.service";
import { DefaultContactService } from "./services/contact.service";
import { ContactRoutes } from "./api/contact.routes";
import { LeadRoutes } from "./api/lead.routes";
import type { EmailService } from "./services/email.service";

// ── Email service selection ────────────────────────────────────────────────────
// If VITE_RESEND_API_KEY is set → send real emails via Resend
// Otherwise → silent MockEmailService (won't fail, just logs)
function createEmailService(): EmailService {
  const key = import.meta.env.VITE_RESEND_API_KEY as string | undefined;
  if (key) {
    const to = import.meta.env.VITE_LEAD_EMAIL ?? "duc.nguyen240205@vnuk.edu.vn";
    const from = import.meta.env.VITE_RESEND_FROM ?? "onboarding@resend.dev";
    console.log(`[DevServer] ✉️  Resend email service active: ${from} → ${to}`);
    return new ResendEmailService(key);
  }
  console.warn("[DevServer] ⚠️  No VITE_RESEND_API_KEY — falling back to MockEmailService (no real emails sent).");
  return new MockEmailService();
}

// ── Service wiring ─────────────────────────────────────────────────────────────
const repository    = new SupabaseCustomerRepository();
const emailService  = createEmailService();
const contactService = new DefaultContactService(repository, emailService);
const contactRoutes  = new ContactRoutes(contactService);
const leadRoutes     = new LeadRoutes(contactService);

/**
 * Dev-only fetch interceptor that routes /api/* calls to in-process handlers
 * backed by the real Supabase DB + Resend emails.
 *
 * Critical: Supabase-destined URLs are passed through directly to prevent an
 * infinite loop — the Supabase JS client uses window.fetch internally.
 */
export function setupMockServer() {
  if (typeof window === "undefined") return;

  const SUPABASE_HOST = import.meta.env.VITE_SUPABASE_URL as string;
  const originalFetch = window.fetch.bind(window);

  window.fetch = async function (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    const urlString =
      typeof input === "string"
        ? input
        : input instanceof URL
        ? input.toString()
        : input.url;

    // ⚡ Pass-through: never intercept Supabase or Resend API calls
    if (
      (SUPABASE_HOST && urlString.startsWith(SUPABASE_HOST)) ||
      urlString.includes("api.resend.com")
    ) {
      return originalFetch(input, init);
    }

    const url    = new URL(urlString, window.location.origin);
    const path   = url.pathname;
    const method = init?.method?.toUpperCase() ?? "GET";

    // ── POST /api/contact ───────────────────────────────────────────────────
    if (path === "/api/contact" && method === "POST") {
      const body    = init?.body ? String(init.body) : "{}";
      const request = new Request(urlString, { ...init, body });
      return contactRoutes.handleCreateLead(request);
    }

    // ── GET /api/leads ──────────────────────────────────────────────────────
    if (path === "/api/leads" && method === "GET") {
      return leadRoutes.handleListLeads();
    }

    // ── PATCH /api/leads/:id ────────────────────────────────────────────────
    if (path.startsWith("/api/leads/") && method === "PATCH") {
      const id      = path.split("/").pop() ?? "";
      const body    = init?.body ? String(init.body) : "{}";
      const request = new Request(urlString, { ...init, body });
      return leadRoutes.handleUpdateLeadStatus(request, { id });
    }

    // ── DELETE /api/leads/:id ───────────────────────────────────────────────
    if (path.startsWith("/api/leads/") && method === "DELETE") {
      const id = path.split("/").pop() ?? "";
      return leadRoutes.handleDeleteLead({ id });
    }

    return originalFetch(input, init);
  };

  console.log(
    "[DevServer] Interceptor active — /api/* → Supabase (real DB) + Resend (real email)."
  );
}
