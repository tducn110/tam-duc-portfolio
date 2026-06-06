import { X, Calendar, User, Mail, Phone, Briefcase, DollarSign, MessageSquare, Trash2 } from "lucide-react";
import { Button, Card } from "@/shared/ui";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { ContactLead } from "@/domain/contact/contact.types";
import { useUpdateLeadStatus } from "../hooks/useUpdateLeadStatus";
import { useDeleteLead } from "../hooks/useDeleteLead";
import { adminDashboardContent } from "@/app/data/adminDashboard";

export interface LeadDetailDrawerProps {
  lead: ContactLead | null;
  onClose: () => void;
  onUpdate: () => void;
}

export function LeadDetailDrawer({ lead, onClose, onUpdate }: LeadDetailDrawerProps) {
  const { update, loading: updating } = useUpdateLeadStatus();
  const { remove, loading: deleting } = useDeleteLead();

  if (!lead) return null;

  const handleStatusChange = async (status: ContactLead["status"]) => {
    try {
      await update(lead.id, status);
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(adminDashboardContent.confirmDeleteAction)) {
      try {
        await remove(lead.id);
        onUpdate();
        onClose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Content drawer */}
      <div className="relative w-full max-w-lg h-full bg-[#090909]/95 border-l border-white/[0.08] shadow-2xl p-6 md:p-8 flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-[#f7f9fa]">{adminDashboardContent.detailsTitle}</h3>
            <LeadStatusBadge status={lead.status} />
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-[#6b6b6b] hover:text-[#f7f9fa] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Details card */}
        <Card variant="frost" className="p-5 space-y-4 mb-6" hoverable={false}>
          <div className="flex items-start gap-3">
            <User size={16} className="text-[#af50ff] mt-0.5" />
            <div>
              <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider">{adminDashboardContent.labelClientName}</span>
              <span className="text-sm font-semibold text-[#f7f9fa]">{lead.name}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail size={16} className="text-[#af50ff] mt-0.5" />
            <div>
              <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider">{adminDashboardContent.labelEmailAddress}</span>
              <a href={`mailto:${lead.email}`} className="text-sm text-[#af50ff] hover:underline">{lead.email}</a>
            </div>
          </div>

          {lead.phone && (
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[#af50ff] mt-0.5" />
              <div>
                <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider">{adminDashboardContent.labelPhoneNumber}</span>
                <span className="text-sm text-[#f7f9fa]">{lead.phone}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Briefcase size={16} className="text-[#af50ff] mt-0.5" />
              <div>
                <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider">{adminDashboardContent.labelServiceType}</span>
                <span className="text-sm font-medium text-[#f7f9fa] capitalize">{lead.serviceType}</span>
              </div>
            </div>

            {lead.budget && (
              <div className="flex items-start gap-3">
                <DollarSign size={16} className="text-[#af50ff] mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider">{adminDashboardContent.labelBudget}</span>
                  <span className="text-sm font-medium text-[#f7f9fa]">{lead.budget}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3">
            <Calendar size={16} className="text-[#af50ff] mt-0.5" />
            <div>
              <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider">{adminDashboardContent.labelSubmittedAt}</span>
              <span className="text-sm text-[#f0f0f0]/80">{new Date(lead.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Message */}
        <div className="mb-8 flex-1">
          <div className="flex items-center gap-2 mb-2 text-[#6b6b6b]">
            <MessageSquare size={14} />
            <span className="text-xs uppercase tracking-wider">{adminDashboardContent.labelMessage}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/[0.04] text-sm text-[#f0f0f0]/85 whitespace-pre-wrap leading-relaxed min-h-[120px]">
            {lead.message}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/[0.08] space-y-4">
          <div>
            <span className="text-[10px] text-[#6b6b6b] block uppercase tracking-wider mb-2">{adminDashboardContent.labelUpdateStatus}</span>
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant={lead.status === "new" ? "primary" : "secondary"}
                size="sm"
                disabled={updating}
                onClick={() => handleStatusChange("new")}
              >
                {adminDashboardContent.btnStatusNew}
              </Button>
              <Button
                variant={lead.status === "contacted" ? "primary" : "secondary"}
                size="sm"
                disabled={updating}
                onClick={() => handleStatusChange("contacted")}
              >
                {adminDashboardContent.btnStatusContacted}
              </Button>
              <Button
                variant={lead.status === "closed" ? "primary" : "secondary"}
                size="sm"
                disabled={updating}
                onClick={() => handleStatusChange("closed")}
              >
                {adminDashboardContent.btnStatusClosed}
              </Button>
              <Button
                variant={lead.status === "rejected" ? "primary" : "secondary"}
                size="sm"
                disabled={updating}
                onClick={() => handleStatusChange("rejected")}
              >
                {adminDashboardContent.btnStatusReject}
              </Button>
            </div>
          </div>

          <Button
            variant="danger"
            size="md"
            disabled={deleting}
            onClick={handleDelete}
            iconLeft={<Trash2 size={14} />}
            className="w-full flex items-center justify-center gap-2"
          >
            {adminDashboardContent.btnDeleteLead}
          </Button>
        </div>
      </div>
    </div>
  );
}

