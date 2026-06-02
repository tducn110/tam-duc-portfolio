import { Eye, Mail, Trash2 } from "lucide-react";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { ContactLead } from "../types";
import { useDeleteLead } from "../hooks/useDeleteLead";
import { Button } from "@/shared/ui";

export interface LeadTableProps {
  leads: ContactLead[];
  loading: boolean;
  onSelect: (lead: ContactLead) => void;
  onRefresh: () => void;
}

export function LeadTable({ leads, loading, onSelect, onRefresh }: LeadTableProps) {
  const { remove } = useDeleteLead();

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await remove(id);
        onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="w-8 h-8 border-2 border-[#af50ff] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-[#6b6b6b]">Loading customer leads...</span>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-20 border border-white/[0.04] rounded-2xl bg-white/[0.02]">
        <Mail size={36} className="text-[#6b6b6b] mx-auto mb-3" />
        <h4 className="text-base font-semibold text-[#f7f9fa]">No leads found</h4>
        <p className="text-sm text-[#6b6b6b] mt-1 max-w-xs mx-auto">
          When visitors submit your portfolio contact form, their requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/[0.08] bg-[#090909]/40 backdrop-blur-md">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.02]">
            <th className="px-6 py-4 font-semibold text-[#f7f9fa]">Client</th>
            <th className="px-6 py-4 font-semibold text-[#f7f9fa]">Service</th>
            <th className="px-6 py-4 font-semibold text-[#f7f9fa]">Budget</th>
            <th className="px-6 py-4 font-semibold text-[#f7f9fa]">Status</th>
            <th className="px-6 py-4 font-semibold text-[#f7f9fa]">Email Status</th>
            <th className="px-6 py-4 font-semibold text-[#f7f9fa]">Date</th>
            <th className="px-6 py-4 font-semibold text-[#f7f9fa] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => onSelect(lead)}
              className="hover:bg-white/[0.02] cursor-pointer transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <div className="font-semibold text-[#f7f9fa]">{lead.name}</div>
                <div className="text-xs text-[#6b6b6b] mt-0.5">{lead.email}</div>
              </td>
              <td className="px-6 py-4 text-[#f0f0f0]/80 capitalize">
                {lead.serviceType}
              </td>
              <td className="px-6 py-4 text-[#f0f0f0]/80">
                {lead.budget || "—"}
              </td>
              <td className="px-6 py-4">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    lead.notificationStatus === "sent"
                      ? "border-green-500/30 text-green-400 bg-green-500/10"
                      : lead.notificationStatus === "failed"
                      ? "border-red-500/30 text-red-400 bg-red-500/10"
                      : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                  }`}
                >
                  {lead.notificationStatus}
                </span>
              </td>
              <td className="px-6 py-4 text-[#6b6b6b]">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 h-8 w-8 hover:bg-white/5 rounded-lg text-[#6b6b6b] hover:text-[#f7f9fa]"
                    onClick={() => onSelect(lead)}
                  >
                    <Eye size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 h-8 w-8 hover:bg-red-500/10 rounded-lg text-[#6b6b6b] hover:text-red-400 border-transparent hover:border-transparent"
                    onClick={(e) => handleDelete(e, lead.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
