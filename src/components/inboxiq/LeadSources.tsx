"use client";
import React from "react";

interface LeadSource {
  source: string;
  percentage: number;
}

// Data from design.md
const leadSources: LeadSource[] = [
  { source: "Story reply", percentage: 45 },
  { source: "Direct DM", percentage: 32 },
  { source: "Post comment", percentage: 18 },
  { source: "Reel engagement", percentage: 5 },
];

export default function LeadSources() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Lead Sources
      </h3>
      <div className="space-y-4">
        {leadSources.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.source}
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                {item.percentage}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full dark:bg-gray-800">
              <div
                className="h-2.5 rounded-full bg-success-500 transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
