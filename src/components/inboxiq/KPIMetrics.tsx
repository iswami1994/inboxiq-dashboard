"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, ChatIcon, GroupIcon, BoltIcon, TimeIcon, AlertIcon } from "@/icons";
import { getKPIMetrics, KPIMetrics as KPIMetricsData } from "@/lib/api";
import { useWebSocketContext } from "@/context/WebSocketContext";

interface KPIMetric {
  label: string;
  value: string;
  trend: number;
  trendLabel?: string;
  icon: React.ReactNode;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`.replace(".0k", "k");
  }
  return num.toLocaleString();
}

function formatResponseTime(ms: number | null): string {
  if (ms === null) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export default function KPIMetrics() {
  const [kpiData, setKpiData] = useState<KPIMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { onKPIUpdate } = useWebSocketContext();

  useEffect(() => {
    // Initial fetch
    async function fetchKPIs() {
      try {
        const data = await getKPIMetrics();
        setKpiData(data);
      } catch (error) {
        console.error("Failed to fetch KPIs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchKPIs();

    // Subscribe to real-time updates
    const unsubscribe = onKPIUpdate((event) => {
      // Merge partial updates
      setKpiData((prev) => (prev ? { ...prev, ...event } : prev));
    });

    return unsubscribe;
  }, [onKPIUpdate]);

  // Build metrics from API data or show loading state
  const metrics: KPIMetric[] = kpiData
    ? [
        {
          label: "Total Conversations",
          value: formatNumber(kpiData.total_conversations),
          trend: kpiData.trends.total_conversations,
          icon: <ChatIcon className="text-gray-800 size-6 dark:text-white/90" />,
        },
        {
          label: "Automation Rate",
          value: `${kpiData.automation_rate}%`,
          trend: kpiData.trends.automation_rate,
          icon: <BoltIcon className="text-gray-800 size-6 dark:text-white/90" />,
        },
        {
          label: "Manual Review",
          value: formatNumber(kpiData.manual_review_count),
          trend: kpiData.trends.manual_review,
          icon: <AlertIcon className="text-gray-800 size-6 dark:text-white/90" />,
        },
        {
          label: "Collab Leads",
          value: formatNumber(kpiData.collab_leads),
          trend: kpiData.trends.collab_leads,
          icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
        },
        {
          label: "Response Time",
          value: formatResponseTime(kpiData.avg_response_time_ms),
          trend: 0,
          trendLabel: "—",
          icon: <TimeIcon className="text-gray-800 size-6 dark:text-white/90" />,
        },
      ]
    : [
        { label: "Total Conversations", value: "—", trend: 0, icon: <ChatIcon className="text-gray-800 size-6 dark:text-white/90" /> },
        { label: "Automation Rate", value: "—", trend: 0, icon: <BoltIcon className="text-gray-800 size-6 dark:text-white/90" /> },
        { label: "Manual Review", value: "—", trend: 0, icon: <AlertIcon className="text-gray-800 size-6 dark:text-white/90" /> },
        { label: "Collab Leads", value: "—", trend: 0, icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> },
        { label: "Response Time", value: "—", trend: 0, trendLabel: "—", icon: <TimeIcon className="text-gray-800 size-6 dark:text-white/90" /> },
      ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 ${
            loading ? "animate-pulse" : ""
          }`}
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
