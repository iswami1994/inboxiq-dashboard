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

interface PendingReview {
  username: string;
  message: string;
  classification: string;
  waitTime: string;
}

// Data from design.md
const pendingReviews: PendingReview[] = [
  {
    username: "@vishesh_nitesh",
    message: "I might be of help",
    classification: "collab",
    waitTime: "2h",
  },
  {
    username: "@chippymathew",
    message: "Portfolio submission",
    classification: "collab",
    waitTime: "3h",
  },
  {
    username: "@moon_unflitered",
    message: "Long message about job",
    classification: "collab",
    waitTime: "4h",
  },
  {
    username: "@sunilnunavath09",
    message: "AI projects inquiry",
    classification: "question",
    waitTime: "5h",
  },
  {
    username: "@tirthpatel00",
    message: "Shared external link",
    classification: "unclear",
    waitTime: "6h",
  },
];

export default function PendingReviewsTable() {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "collab":
        return "success";
      case "question":
        return "info";
      case "unclear":
        return "warning";
      default:
        return "light";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Pending Reviews
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Requires Human Action
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
                Message
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Wait
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {pendingReviews.map((review, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                <TableCell className="py-3">
                  <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {review.username}
                  </span>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {review.message}
                </TableCell>
                <TableCell className="py-3">
                  <Badge size="sm" color={getClassificationColor(review.classification)}>
                    {review.classification}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {review.waitTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
