import type { ContactService } from "../services/contact.service";
import type { ContactLead } from "@/features/contact/types";

export class LeadRoutes {
  constructor(private contactService: ContactService) {}

  async handleListLeads(): Promise<Response> {
    try {
      const leads = await this.contactService.listLeads();
      return new Response(JSON.stringify(leads), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  async handleUpdateLeadStatus(req: Request, params: { id: string }): Promise<Response> {
    try {
      const body = await req.json();
      const status = body.status as ContactLead["status"];
      if (!status) {
        return new Response(JSON.stringify({ error: "Status is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const updated = await this.contactService.updateLeadStatus(params.id, status);
      return new Response(JSON.stringify(updated), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  async handleDeleteLead(params: { id: string }): Promise<Response> {
    try {
      await this.contactService.deleteLead(params.id);
      return new Response(null, { status: 204 });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
