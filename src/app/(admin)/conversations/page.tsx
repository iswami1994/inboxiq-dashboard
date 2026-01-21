import type { Metadata } from "next";
import React from "react";
import PendingReviewsTable from "@/components/inboxiq/PendingReviewsTable";
import LiveFeed from "@/components/inboxiq/LiveFeed";

export const metadata: Metadata = {
  title: "Conversations | InboxIQ Dashboard",
  description: "InboxIQ Conversations - View and manage all DM conversations",
};

export default function ConversationsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Header Stats */}
      <div className="col-span-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <span className="text-sm text-gray-500 dark:text-gray-400">Today&apos;s Messages</span>
            <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">1,847</h4>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <span className="text-sm text-gray-500 dark:text-gray-400">Pending Review</span>
            <h4 className="mt-2 text-2xl font-bold text-warning-600 dark:text-warning-400">156</h4>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <span className="text-sm text-gray-500 dark:text-gray-400">Auto-Responded</span>
            <h4 className="mt-2 text-2xl font-bold text-success-600 dark:text-success-400">1,623</h4>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <span className="text-sm text-gray-500 dark:text-gray-400">Avg Response Time</span>
            <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">1.2s</h4>
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="col-span-12 xl:col-span-5">
        <LiveFeed />
      </div>

      {/* Pending Reviews */}
      <div className="col-span-12 xl:col-span-7">
        <PendingReviewsTable />
      </div>
    </div>
  );
}
