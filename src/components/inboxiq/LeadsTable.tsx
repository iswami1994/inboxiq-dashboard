"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Lead {
  username: string;
  intent: string;
  status: "Pending" | "Reviewed";
  days: number;
}

// Data from design.md
const leads: Lead[] = [
  { username: "@a_k_s_h_a_y__1994", intent: "AI video role", status: "Pending", days: 2 },
  { username: "@shwet_2823", intent: "Freelance collab", status: "Pending", days: 2 },
  { username: "@kavsievora", intent: "Content strategy", status: "Pending", days: 3 },
  { username: "@beingbot.pro", intent: "Growth marketing", status: "Reviewed", days: 3 },
  { username: "@harshpesocho", intent: "AI clips creation", status: "Pending", days: 3 },
];

export default function LeadsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top Collaboration Leads
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pending Follow-up
          </p>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Username
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Intent
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Days
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {leads.map((lead, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                <TableCell className="py-3">
                  <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {lead.username}
                  </span>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {lead.intent}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={lead.status === "Pending" ? "warning" : "success"}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {lead.days}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
