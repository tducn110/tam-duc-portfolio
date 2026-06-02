import { useState } from "react";
import { ArrowLeft, RefreshCw, Users } from "lucide-react";
import { useLeads } from "@/features/contact/hooks/useLeads";
import { LeadTable } from "@/features/contact/components/LeadTable";
import { LeadDetailDrawer } from "@/features/contact/components/LeadDetailDrawer";
import type { ContactLead } from "@/features/contact/types";
import { Section, SectionHeading, Button } from "@/shared/ui";
import { fonts } from "@/shared/lib/tokens";

export default function AdminLeadsPage() {
  const { leads, loading, error, refetch } = useLeads();
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);

  // Sync selected lead when leads update (in case status changed)
  const handleLeadUpdate = () => {
    refetch();
    if (selectedLead) {
      const updated = leads.find((l) => l.id === selectedLead.id);
      if (updated) setSelectedLead(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-foreground relative overflow-x-hidden pt-8 pb-20">
      {/* Cosmic background glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6c4bd6]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-[#af50ff]/10 blur-[140px] pointer-events-none" />

      <Section id="admin-leads" className="py-12 md:py-16 relative" animate={false}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs text-[#6b6b6b] hover:text-[#af50ff] uppercase transition-colors"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.15em" }}
            >
              <ArrowLeft size={14} /> Back to site
            </a>
            <div
              className="text-[10px] text-[#6b6b6b] uppercase"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.2em" }}
            >
              System · CRM · Admin Center
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <SectionHeading
              eyebrow="Customer Management"
              eyebrowColor="violet"
              title="Customer"
              italicWord="leads."
              description="Review request details, update client connection states, manage budget scopes, or log direct service actions."
            />

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => refetch()}
                disabled={loading}
                iconLeft={<RefreshCw size={14} className={loading ? "animate-spin" : ""} />}
              >
                Refresh
              </Button>
              <div className="frost border border-white/[0.08] rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm text-[#f7f9fa] backdrop-blur-md">
                <Users size={16} className="text-[#af50ff]" />
                <span style={{ fontFamily: fonts.mono }}>
                  Total: {leads.length}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <LeadTable
            leads={leads}
            loading={loading}
            onSelect={setSelectedLead}
            onRefresh={handleLeadUpdate}
          />
        </div>
      </Section>

      {/* Drawer */}
      <LeadDetailDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={handleLeadUpdate}
      />
    </div>
  );
}
