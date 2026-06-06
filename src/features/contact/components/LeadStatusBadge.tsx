import { Badge } from "@/shared/ui";
import type { ContactLead } from "@/domain/contact/contact.types";

export function LeadStatusBadge({ status }: { status: ContactLead["status"] }) {
  const map: Record<ContactLead["status"], { color: "violet" | "indigo" | "teal" | "slate"; label: string }> = {
    new: { color: "violet", label: "New" },
    contacted: { color: "indigo", label: "Contacted" },
    closed: { color: "teal", label: "Closed" },
    rejected: { color: "slate", label: "Rejected" },
    archived: { color: "slate", label: "Archived" }
  };
  const config = map[status] || { color: "slate", label: status };

  return <Badge color={config.color} variant="subtle">{config.label}</Badge>;
}
