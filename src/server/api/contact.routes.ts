import type { ContactService } from "../../domain/contact/contact.service";
import { contactCreateSchema } from "../../domain/contact/contact.schema";

export class ContactRoutes {
  constructor(private contactService: ContactService) {}

  async handleCreateLead(req: Request): Promise<Response> {
    try {
      const body = await req.json();
      const parsed = contactCreateSchema.safeParse(body);
      if (!parsed.success) {
        return new Response(JSON.stringify({ error: parsed.error.format() }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const lead = await this.contactService.createLead(parsed.data);
      return new Response(JSON.stringify(lead), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
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
}
