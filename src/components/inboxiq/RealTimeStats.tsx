"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RealTimeStats() {
  const sparklineOptions: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    colors: ["#6366F1"],
    tooltip: {
      enabled: false,
    },
  };

  const messagesData = [12, 15, 18, 14, 22, 19, 25, 23, 28, 24, 30, 27, 32, 29, 35];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Real-Time Metrics
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: Just now
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Messages Per Minute */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Messages/min
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
            32
          </p>
          <div className="mt-2">
            <Chart
              options={sparklineOptions}
              series={[{ data: messagesData }]}
              type="area"
              height={40}
            />
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Active Sessions
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
            847
          </p>
          <div className="mt-2">
            <Chart
              options={{ ...sparklineOptions, colors: ["#10B981"] }}
              series={[{ data: [80, 85, 82, 88, 90, 87, 92, 89, 95, 91, 98, 94, 100, 97, 102] }]}
              type="area"
              height={40}
            />
          </div>
        </div>

        {/* Response Rate */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Auto-Response Rate
            </span>
          </div>
          <p className="text-2xl font-bold text-success-600 dark:text-success-400">
            94.2%
          </p>
          <div className="mt-2">
            <Chart
              options={{ ...sparklineOptions, colors: ["#10B981"] }}
              series={[{ data: [92, 93, 94, 93, 95, 94, 96, 95, 94, 95, 94, 93, 94, 95, 94] }]}
              type="area"
              height={40}
            />
          </div>
        </div>

        {/* Error Rate */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Error Rate
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
            0.3%
          </p>
          <div className="mt-2">
            <Chart
              options={{ ...sparklineOptions, colors: ["#EF4444"] }}
              series={[{ data: [0.5, 0.4, 0.3, 0.4, 0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.3] }]}
              type="area"
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
