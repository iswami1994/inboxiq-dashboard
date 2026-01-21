"use client";
import React from "react";

interface LiveMessage {
  time: string;
  classification: "neutral" | "question" | "unclear" | "collab";
  needsReview: boolean;
}

// Data from design.md - Classification Live (last 10 messages)
const liveMessages: LiveMessage[] = [
  { time: "14:21", classification: "neutral", needsReview: false },
  { time: "14:20", classification: "question", needsReview: false },
  { time: "14:18", classification: "unclear", needsReview: true },
  { time: "14:15", classification: "collab", needsReview: true },
  { time: "14:12", classification: "neutral", needsReview: false },
  { time: "14:10", classification: "question", needsReview: false },
  { time: "14:08", classification: "neutral", needsReview: false },
  { time: "14:05", classification: "unclear", needsReview: true },
  { time: "14:02", classification: "neutral", needsReview: false },
  { time: "14:00", classification: "question", needsReview: false },
];

export default function LiveFeed() {
  const getClassificationColor = (classification: LiveMessage["classification"]) => {
    switch (classification) {
      case "neutral":
        return "text-gray-600 dark:text-gray-400";
      case "question":
        return "text-blue-600 dark:text-blue-400";
      case "unclear":
        return "text-warning-600 dark:text-warning-400";
      case "collab":
        return "text-success-600 dark:text-success-400";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Classification Live
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last 10 messages
        </span>
      </div>

      <div className="space-y-2">
        {liveMessages.map((msg, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-12">
                {msg.time}
              </span>
              <span className={`text-sm font-medium ${getClassificationColor(msg.classification)}`}>
                {msg.classification}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${msg.needsReview ? "bg-warning-500" : "bg-success-500"}`} />
              {msg.needsReview && (
                <span className="text-xs font-medium text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-500/15 px-2 py-0.5 rounded">
                  REVIEW
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
