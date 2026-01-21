"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowUpIcon, ArrowDownIcon } from "@/icons";

interface Metric {
  label: string;
  value: string;
  trend: number;
  description: string;
}

const metrics: Metric[] = [
  {
    label: "Total Leads",
    value: "2,156",
    trend: 23.1,
    description: "This month",
  },
  {
    label: "Conversion Rate",
    value: "18.7%",
    trend: 4.2,
    description: "From lead to customer",
  },
  {
    label: "Avg Deal Value",
    value: "$4,850",
    trend: 12.5,
    description: "Per converted lead",
  },
  {
    label: "Pipeline Value",
    value: "$156K",
    trend: -2.3,
    description: "Total potential revenue",
  },
];

export default function LeadMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {metric.label}
          </span>
          <div className="flex items-end justify-between mt-3">
            <div>
              <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                {metric.value}
              </h4>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {metric.description}
              </span>
            </div>
            <Badge color={metric.trend >= 0 ? "success" : "error"}>
              {metric.trend >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon className="text-error-500" />}
              {Math.abs(metric.trend)}%
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
