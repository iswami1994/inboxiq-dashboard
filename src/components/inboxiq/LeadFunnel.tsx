"use client";
import React from "react";

interface FunnelStage {
  label: string;
  value: number;
}

// Data from design.md
const funnelData: FunnelStage[] = [
  { label: "Initial Contact", value: 1247 },
  { label: "Expressed Interest", value: 312 },
  { label: "Qualified Leads", value: 89 },
  { label: "Converted", value: 23 },
];

export default function LeadFunnel() {
  const maxValue = funnelData[0].value;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Lead Funnel
          </h3>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="relative py-4">
        <div className="flex flex-col items-center gap-1">
          {funnelData.map((stage, index) => {
            const widthPercent = ((stage.value / maxValue) * 100);
            const minWidth = 20;
            const adjustedWidth = Math.max(minWidth, widthPercent);

            const colors = [
              "from-brand-600 to-brand-500",
              "from-brand-500 to-brand-400",
              "from-brand-400 to-brand-300",
              "from-brand-300 to-brand-200",
            ];

            return (
              <div key={stage.label} className="w-full flex flex-col items-center">
                <div
                  className={`relative bg-gradient-to-r ${colors[index]} flex items-center justify-center py-5 transition-all duration-300 hover:opacity-90 cursor-pointer`}
                  style={{
                    width: `${adjustedWidth}%`,
                    clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <div className="flex flex-col items-center text-white">
                    <span className="text-xl font-bold">{stage.value.toLocaleString()}</span>
                    <span className="text-xs opacity-90">{stage.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
