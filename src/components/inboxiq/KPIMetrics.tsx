"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, ChatIcon, GroupIcon, BoltIcon, TimeIcon, AlertIcon } from "@/icons";

interface KPIMetric {
  label: string;
  value: string;
  trend: number;
  trendLabel?: string;
  icon: React.ReactNode;
}

// KPIs as defined in design.md
const metrics: KPIMetric[] = [
  {
    label: "Total Conversations",
    value: "1,247",
    trend: 18,
    icon: <ChatIcon className="text-gray-800 size-6 dark:text-white/90" />,
  },
  {
    label: "Automation Rate",
    value: "62.3%",
    trend: 5,
    icon: <BoltIcon className="text-gray-800 size-6 dark:text-white/90" />,
  },
  {
    label: "Manual Review",
    value: "471",
    trend: -12,
    icon: <AlertIcon className="text-gray-800 size-6 dark:text-white/90" />,
  },
  {
    label: "Collab Leads",
    value: "89",
    trend: 24,
    icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
  },
  {
    label: "Response Time",
    value: "<1s",
    trend: 0,
    trendLabel: "—",
    icon: <TimeIcon className="text-gray-800 size-6 dark:text-white/90" />,
  },
];

export default function KPIMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {metric.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {metric.value}
              </h4>
            </div>
            {metric.trendLabel ? (
              <span className="text-sm text-gray-400 dark:text-gray-500">{metric.trendLabel}</span>
            ) : (
              <Badge color={metric.trend >= 0 ? "success" : "error"}>
                {metric.trend >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon className="text-error-500" />}
                {Math.abs(metric.trend)}%
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
