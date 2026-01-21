"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ClassificationTrendChart() {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#6366F1", "#10B981", "#F59E0B", "#EC4899", "#14B8A6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
  };

  // Categories from design.md: Neutral (38%), Unclear (31%), Question (18%), Collaboration (9%), Other (4%)
  const series = [
    {
      name: "Neutral",
      data: [420, 445, 462, 474],
    },
    {
      name: "Unclear",
      data: [340, 362, 378, 387],
    },
    {
      name: "Question",
      data: [195, 210, 218, 224],
    },
    {
      name: "Collaboration",
      data: [98, 105, 110, 112],
    },
    {
      name: "Other",
      data: [42, 46, 48, 50],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Classification Trends
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Message classification over the past 4 weeks
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] xl:min-w-full">
          <Chart options={options} series={series} type="line" height={350} />
        </div>
      </div>
    </div>
  );
}
