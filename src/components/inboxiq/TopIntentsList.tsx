"use client";
import React from "react";

interface Intent {
  name: string;
  count: number;
}

// Data from design.md
const intents: Intent[] = [
  { name: "Expressing interest", count: 187 },
  { name: "Greeting/initial", count: 156 },
  { name: "Job inquiry", count: 89 },
  { name: "Shared contact info", count: 67 },
  { name: "AI video generation", count: 54 },
  { name: "Collaboration offer", count: 43 },
  { name: "Application process", count: 38 },
  { name: "Tools inquiry", count: 29 },
];

export default function TopIntentsList() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Top User Intents
      </h3>
      <div className="space-y-3">
        {intents.map((intent, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-500 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-400">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                {intent.name}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ({intent.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
