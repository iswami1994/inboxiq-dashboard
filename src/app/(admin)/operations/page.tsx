import type { Metadata } from "next";
import React from "react";
import SystemStatus from "@/components/inboxiq/SystemStatus";
import QueueStats from "@/components/inboxiq/QueueStats";
import LiveFeed from "@/components/inboxiq/LiveFeed";
import MessagesToday from "@/components/inboxiq/MessagesToday";
import PendingReviewsTable from "@/components/inboxiq/PendingReviewsTable";

export const metadata: Metadata = {
  title: "Operations Center | InboxIQ Dashboard",
  description: "InboxIQ Real-Time Operations - Monitor system health and queue status",
};

export default function OperationsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Live Indicator Header */}
      <div className="flex items-center justify-end gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-success-500 animate-pulse" />
        <span className="text-sm font-medium text-success-600 dark:text-success-400">Live</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Updated: 14:22:15</span>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Manual Review Queue & System Status */}
        <div className="col-span-12 xl:col-span-4">
          <QueueStats />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <SystemStatus />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <MessagesToday />
        </div>

        {/* Classification Live & Pending Reviews */}
        <div className="col-span-12 xl:col-span-5">
          <LiveFeed />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <PendingReviewsTable />
        </div>
      </div>
    </div>
  );
}
