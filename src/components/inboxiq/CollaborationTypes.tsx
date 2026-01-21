"use client";
import React from "react";

interface CollabType {
  type: string;
  percentage: number;
}

// Data from design.md
const collabTypes: CollabType[] = [
  { type: "Job/Internship inquiry", percentage: 34 },
  { type: "Partnership offer", percentage: 28 },
  { type: "Portfolio submission", percentage: 22 },
  { type: "Service offer", percentage: 16 },
];

export default function CollaborationTypes() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Collaboration Types
      </h3>
      <div className="space-y-4">
        {collabTypes.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.type}
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                {item.percentage}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full dark:bg-gray-800">
              <div
                className="h-2.5 rounded-full bg-brand-500 transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
