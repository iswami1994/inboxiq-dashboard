import type { Metadata } from "next";
import React from "react";
import ClassificationTrendChart from "@/components/inboxiq/ClassificationTrendChart";
import TopIntentsList from "@/components/inboxiq/TopIntentsList";
import ManualReviewReasons from "@/components/inboxiq/ManualReviewReasons";
import ResponseEffectivenessChart from "@/components/inboxiq/ResponseEffectivenessChart";
import HourlyActivityHeatmap from "@/components/inboxiq/HourlyActivityHeatmap";

export const metadata: Metadata = {
  title: "Conversation Analytics | InboxIQ Dashboard",
  description: "InboxIQ Conversation Analytics - Deep dive into message patterns",
};

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Classification Trend + Top Intents */}
      <div className="col-span-12 xl:col-span-7">
        <ClassificationTrendChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <TopIntentsList />
      </div>

      {/* Manual Review Reasons + Response Effectiveness */}
      <div className="col-span-12 xl:col-span-6">
        <ManualReviewReasons />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <ResponseEffectivenessChart />
      </div>

      {/* Hourly Activity Heatmap */}
      <div className="col-span-12">
        <HourlyActivityHeatmap />
      </div>
    </div>
  );
}
