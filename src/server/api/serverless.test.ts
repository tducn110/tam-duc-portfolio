import { describe, it, expect, vi, beforeEach } from "vitest";
import contactHandler from "../../../api/contact";
import leadsIndexHandler from "../../../api/leads/index";
import leadsIdHandler from "../../../api/leads/[id]";
import { verifyAdmin } from "../../server/lib/auth";

// Mock auth module
vi.mock("../../server/lib/auth", () => ({
  verifyAdmin: vi.fn(),
}));

// Mock Supabase customer repository
vi.mock("../../server/repositories/customer.supabase.repository", () => {
  return {
    SupabaseCustomerRepository: class {
      create = vi.fn().mockResolvedValue({ id: "lead-123", name: "Test Lead", status: "new" });
      findMany = vi.fn().mockResolvedValue([{ id: "lead-123", name: "Test Lead", status: "new" }]);
      updateStatus = vi.fn().mockResolvedValue({ id: "lead-123", status: "contacted" });
      delete = vi.fn().mockResolvedValue(undefined);
    },
  };
});

// Mock Resend Email Service to avoid sending real emails in test
vi.mock("../../server/services/email.resend.service", () => {
  return {
    ResendEmailService: class {
      sendLeadNotification = vi.fn().mockResolvedValue(undefined);
    },
  };
});

describe("Serverless API Security & Validation Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/contact", () => {
    it("should reject spam bots with 204 No Content when honeypot field is filled", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Spam Bot",
          email: "bot@spam.com",
          serviceType: "standard",
          message: "I am a spam bot and I fill all fields",
          website: "http://attacker-site.com", // honeypot
        }),
      });

      const response = await contactHandler(request);
      expect(response.status).toBe(204);
    });

    it("should reject input with invalid max length with 400 Bad Request", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "A".repeat(101), // exceeds 100 max
          email: "test@example.com",
          serviceType: "standard",
          message: "Short valid message length",
        }),
      });

      const response = await contactHandler(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.name).toBeDefined();
    });
  });

  describe("GET /api/leads", () => {
    it("should return 401 Unauthorized when token is missing or invalid", async () => {
      vi.mocked(verifyAdmin).mockResolvedValueOnce({
        error: "Missing or invalid Authorization header",
        status: 401,
      });

      const request = new Request("http://localhost/api/leads", { method: "GET" });
      const response = await leadsIndexHandler(request);
      expect(response.status).toBe(401);
    });

    it("should return 403 Forbidden when user is authenticated but not in allowlist", async () => {
      vi.mocked(verifyAdmin).mockResolvedValueOnce({
        error: "Access denied. You are not an admin.",
        status: 403,
      });

      const request = new Request("http://localhost/api/leads", { method: "GET" });
      const response = await leadsIndexHandler(request);
      expect(response.status).toBe(403);
    });

    it("should return 200 OK and leads list for authorized admin", async () => {
      vi.mocked(verifyAdmin).mockResolvedValueOnce({
        user: { email: "n.tduc011006dn@gmail.com" },
      });

      const request = new Request("http://localhost/api/leads", { method: "GET" });
      const response = await leadsIndexHandler(request);
      expect(response.status).toBe(200);
    });
  });

  describe("PATCH & DELETE /api/leads/[id]", () => {
    it("should return 400 when status update is invalid", async () => {
      vi.mocked(verifyAdmin).mockResolvedValueOnce({
        user: { email: "n.tduc011006dn@gmail.com" },
      });

      const request = new Request("http://localhost/api/leads/lead-123", {
        method: "PATCH",
        body: JSON.stringify({ status: "invalid-status-value" }),
      });

      const response = await leadsIdHandler(request);
      expect(response.status).toBe(400);
    });
  });
});
