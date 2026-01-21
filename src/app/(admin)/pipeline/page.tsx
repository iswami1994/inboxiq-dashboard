import type { Metadata } from "next";
import React from "react";
import LeadFunnel from "@/components/inboxiq/LeadFunnel";
import CollaborationTypes from "@/components/inboxiq/CollaborationTypes";
import LeadSources from "@/components/inboxiq/LeadSources";
import LeadsTable from "@/components/inboxiq/LeadsTable";

export const metadata: Metadata = {
  title: "Collaboration Pipeline | InboxIQ Dashboard",
  description: "InboxIQ Lead Pipeline - Track collaboration leads and conversions",
};

export default function PipelinePage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Lead Funnel - Full Width */}
      <div className="col-span-12">
        <LeadFunnel />
      </div>

      {/* Collaboration Types & Lead Sources */}
      <div className="col-span-12 xl:col-span-6">
        <CollaborationTypes />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <LeadSources />
      </div>

      {/* Top Collaboration Leads Table */}
      <div className="col-span-12">
        <LeadsTable />
      </div>
    </div>
  );
}
