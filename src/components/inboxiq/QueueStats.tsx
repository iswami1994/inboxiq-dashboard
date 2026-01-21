"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Data from design.md
export default function QueueStats() {
  const gaugeOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#E5E7EB",
          strokeWidth: "97%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
            fontWeight: "bold",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.4,
        gradientToColors: ["#6366F1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ["#6366F1"],
  };

  // 67% capacity from design.md
  const capacityUsed = 67;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Manual Review Queue
      </h3>

      {/* Queue Stats from design.md */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
          <span className="text-lg font-bold text-gray-800 dark:text-white/90">47</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Urgent</span>
          <span className="text-lg font-bold text-error-600 dark:text-error-400">12</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Avg Wait</span>
          <span className="text-lg font-bold text-gray-800 dark:text-white/90">2.4 hrs</span>
        </div>
      </div>

      {/* Capacity Gauge */}
      <div className="flex flex-col items-center">
        <Chart
          options={gaugeOptions}
          series={[capacityUsed]}
          type="radialBar"
          height={160}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 -mt-2">
          Capacity
        </span>
      </div>
    </div>
  );
}
