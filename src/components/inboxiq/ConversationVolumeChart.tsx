"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { getConversationVolume, ConversationVolume } from "@/lib/api";
import { useWebSocketContext } from "@/context/WebSocketContext";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ConversationVolumeChart() {
  const [volumeData, setVolumeData] = useState<ConversationVolume[]>([]);
  const [loading, setLoading] = useState(true);
  const { onNewConversation, onResponseSent } = useWebSocketContext();

  useEffect(() => {
    // Initial fetch
    async function fetchVolumeData() {
      try {
        const data = await getConversationVolume(7);
        setVolumeData(data);
      } catch (error) {
        console.error("Failed to fetch volume data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVolumeData();

    // For real-time updates, we could increment today's counts
    const unsubNewConversation = onNewConversation(() => {
      // Increment today's total
      setVolumeData((prev) => {
        if (prev.length === 0) return prev;
        const today = new Date().toISOString().split("T")[0];
        return prev.map((item) =>
          item.date === today ? { ...item, total: item.total + 1 } : item
        );
      });
    });

    const unsubResponseSent = onResponseSent(() => {
      // Increment today's automated count
      setVolumeData((prev) => {
        if (prev.length === 0) return prev;
        const today = new Date().toISOString().split("T")[0];
        return prev.map((item) =>
          item.date === today ? { ...item, automated: item.automated + 1 } : item
        );
      });
    });

    return () => {
      unsubNewConversation();
      unsubResponseSent();
    };
  }, [onNewConversation, onResponseSent]);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#6366F1", "#10B981", "#F59E0B"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.05,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
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
      x: {
        format: "dd MMM",
      },
    },
    xaxis: {
      type: "category",
      categories: volumeData.length > 0 ? volumeData.map((d) => d.day) : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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

  const series = volumeData.length > 0
    ? [
        {
          name: "Inbound",
          data: volumeData.map((d) => d.total),
        },
        {
          name: "Auto-Responded",
          data: volumeData.map((d) => d.automated),
        },
        {
          name: "Manual Review",
          data: volumeData.map((d) => d.manual),
        },
      ]
    : [
        {
          name: "Inbound",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Auto-Responded",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Manual Review",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Conversation Volume
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Daily message trends over the past week
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] xl:min-w-full">
          {loading ? (
            <div className="h-[310px] flex items-center justify-center">
              <div className="animate-pulse text-gray-400 dark:text-gray-500">
                Loading chart data...
              </div>
            </div>
          ) : (
            <Chart options={options} series={series} type="area" height={310} />
          )}
        </div>
      </div>
    </div>
  );
}
