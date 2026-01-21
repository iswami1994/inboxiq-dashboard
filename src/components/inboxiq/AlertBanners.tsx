"use client";
import React from "react";
import { AlertIcon, InfoIcon } from "@/icons";

interface Alert {
  type: "warning" | "critical" | "info";
  message: string;
}

// Alerts from design.md
const alerts: Alert[] = [
  {
    type: "warning",
    message: "47 messages pending manual review",
  },
  {
    type: "critical",
    message: "High unclear rate (31%) - consider improving responses",
  },
];

export default function AlertBanners() {
  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-error-50 dark:bg-error-500/15",
          border: "border-error-200 dark:border-error-500/30",
          icon: "text-error-500",
          dot: "bg-error-500",
        };
      case "warning":
        return {
          bg: "bg-warning-50 dark:bg-warning-500/15",
          border: "border-warning-200 dark:border-warning-500/30",
          icon: "text-warning-500",
          dot: "bg-warning-500",
        };
      case "info":
        return {
          bg: "bg-blue-light-50 dark:bg-blue-light-500/15",
          border: "border-blue-light-200 dark:border-blue-light-500/30",
          icon: "text-blue-light-500",
          dot: "bg-blue-light-500",
        };
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const styles = getAlertStyles(alert.type);
        return (
          <div
            key={index}
            className={`flex items-center gap-3 rounded-xl border p-4 ${styles.bg} ${styles.border}`}
          >
            <div className={`flex-shrink-0 w-2 h-2 rounded-full ${styles.dot}`} />
            <div className={`${styles.icon}`}>
              {alert.type === "info" ? (
                <InfoIcon className="size-5" />
              ) : (
                <AlertIcon className="size-5" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {alert.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
