"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HourlyActivityHeatmap() {
  const generateHeatmapData = (count: number, yrange: { min: number; max: number }) => {
    const series = [];
    for (let i = 0; i < count; i++) {
      series.push({
        x: `${i}:00`,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
      });
    }
    return series;
  };

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#6366F1"],
    xaxis: {
      type: "category",
      labels: {
        style: {
          fontSize: "10px",
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value + " messages";
        },
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 20, color: "#E0E7FF", name: "Low" },
            { from: 21, to: 50, color: "#A5B4FC", name: "Medium" },
            { from: 51, to: 80, color: "#818CF8", name: "High" },
            { from: 81, to: 100, color: "#6366F1", name: "Peak" },
          ],
        },
      },
    },
  };

  const series = [
    { name: "Sunday", data: generateHeatmapData(24, { min: 5, max: 45 }) },
    { name: "Saturday", data: generateHeatmapData(24, { min: 10, max: 55 }) },
    { name: "Friday", data: generateHeatmapData(24, { min: 30, max: 95 }) },
    { name: "Thursday", data: generateHeatmapData(24, { min: 35, max: 100 }) },
    { name: "Wednesday", data: generateHeatmapData(24, { min: 30, max: 90 }) },
    { name: "Tuesday", data: generateHeatmapData(24, { min: 25, max: 85 }) },
    { name: "Monday", data: generateHeatmapData(24, { min: 20, max: 80 }) },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Hourly Activity
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Message volume by hour and day
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px] xl:min-w-full">
          <Chart options={options} series={series} type="heatmap" height={280} />
        </div>
      </div>
    </div>
  );
}
