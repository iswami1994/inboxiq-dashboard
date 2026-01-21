import type { Metadata } from "next";
import React from "react";
import KPIMetrics from "@/components/inboxiq/KPIMetrics";
import ConversationVolumeChart from "@/components/inboxiq/ConversationVolumeChart";
import ClassificationChart from "@/components/inboxiq/ClassificationChart";
import AlertBanners from "@/components/inboxiq/AlertBanners";

export const metadata: Metadata = {
  title: "Executive Summary | InboxIQ Dashboard",
  description: "InboxIQ Instagram DM Automation Dashboard - Executive Summary",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* KPI Metrics Row - 5 headline KPIs */}
      <div className="col-span-12">
        <KPIMetrics />
      </div>

      {/* Charts Row - Volume + Classification */}
      <div className="col-span-12 xl:col-span-7">
        <ConversationVolumeChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <ClassificationChart />
      </div>

      {/* Alerts Section - Key alerts */}
      <div className="col-span-12">
        <AlertBanners />
      </div>
    </div>
  );
}
