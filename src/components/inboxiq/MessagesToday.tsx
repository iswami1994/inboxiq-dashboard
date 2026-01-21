"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Data from design.md
export default function MessagesToday() {
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

  // Sparkline data representing message activity through the day
  const sparklineData = [10, 15, 25, 35, 50, 65, 80, 95, 110, 125, 142, 130, 115, 100, 89];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Messages Today
      </h3>

      {/* Sparkline Chart */}
      <div className="mb-4">
        <Chart
          options={sparklineOptions}
          series={[{ data: sparklineData }]}
          type="area"
          height={60}
        />
      </div>

      {/* Current and Peak */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Current</span>
          <p className="text-xl font-bold text-gray-800 dark:text-white/90">89</p>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500 dark:text-gray-400">Peak</span>
          <p className="text-xl font-bold text-gray-800 dark:text-white/90">142</p>
        </div>
      </div>

      {/* Automated vs Manual from design.md */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Automated</span>
          <span className="text-sm font-medium text-gray-800 dark:text-white/90">
            56 <span className="text-success-600">(63%)</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Manual</span>
          <span className="text-sm font-medium text-gray-800 dark:text-white/90">
            33 <span className="text-warning-600">(37%)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
