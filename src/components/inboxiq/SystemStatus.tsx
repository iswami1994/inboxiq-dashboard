"use client";
import React from "react";

interface Service {
  name: string;
  status: "Connected" | "Healthy" | "Degraded" | "Down";
}

// Services from design.md
const services: Service[] = [
  { name: "Instagram API", status: "Connected" },
  { name: "AI Response", status: "Healthy" },
  { name: "Database", status: "Healthy" },
  { name: "Webhook", status: "Healthy" },
];

export default function SystemStatus() {
  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "Connected":
      case "Healthy":
        return "bg-success-500";
      case "Degraded":
        return "bg-warning-500";
      case "Down":
        return "bg-error-500";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        System Status
      </h3>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                {service.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {service.status}
            </span>
          </div>
        ))}
      </div>

      {/* Uptime */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Uptime</span>
          <span className="text-lg font-bold text-success-600 dark:text-success-400">99.94%</span>
        </div>
      </div>
    </div>
  );
}
