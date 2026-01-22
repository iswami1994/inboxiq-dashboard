"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { getPendingReviews, PendingReview } from "@/lib/api";
import { useWebSocketContext, NewConversationEvent, ClassificationEvent } from "@/context/WebSocketContext";

interface PendingReviewItem {
  id: string;
  username: string;
  message: string;
  classification: string;
  waitTime: string;
  channel: string;
}

export default function PendingReviewsTable() {
  const [reviews, setReviews] = useState<PendingReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { onNewConversation, onClassificationComplete, onResponseSent } = useWebSocketContext();

  useEffect(() => {
    // Initial fetch
    async function fetchPendingReviews() {
      try {
        const data = await getPendingReviews(10);
        setReviews(
          data.map((item: PendingReview) => ({
            id: item.id,
            username: item.username,
            message: item.message,
            classification: item.classification,
            waitTime: item.wait_time,
            channel: item.channel,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch pending reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPendingReviews();

    // Subscribe to new conversations (may need review)
    const unsubNewConv = onNewConversation((event: NewConversationEvent) => {
      if (event.status === "pending_review") {
        const newReview: PendingReviewItem = {
          id: event.id,
          username: `@${event.sender_name}` || "Unknown",
          message: event.message_preview,
          classification: "pending",
          waitTime: "<1m",
          channel: event.channel,
        };
        setReviews((prev) => [newReview, ...prev].slice(0, 10));
      }
    });

    // Subscribe to classification completions (update classification)
    const unsubClassification = onClassificationComplete((event: ClassificationEvent) => {
      if (!event.is_automated) {
        // Update existing or add new pending review
        setReviews((prev) => {
          const exists = prev.find((r) => r.id === event.conversation_id);
          if (exists) {
            return prev.map((r) =>
              r.id === event.conversation_id
                ? { ...r, classification: event.classification }
                : r
            );
          }
          return prev;
        });
      } else {
        // Automated = remove from pending reviews
        setReviews((prev) => prev.filter((r) => r.id !== event.conversation_id));
      }
    });

    // Subscribe to response sent events (remove from pending)
    const unsubResponseSent = onResponseSent((event) => {
      setReviews((prev) => prev.filter((r) => r.id !== event.conversation_id));
    });

    return () => {
      unsubNewConv();
      unsubClassification();
      unsubResponseSent();
    };
  }, [onNewConversation, onClassificationComplete, onResponseSent]);

  const getClassificationColor = (classification: string) => {
    switch (classification.toLowerCase()) {
      case "collab":
      case "collaboration":
        return "success";
      case "question":
      case "support":
        return "info";
      case "unclear":
      case "pending":
        return "warning";
      default:
        return "light";
    }
  };

  const getChannelBadge = (channel: string) => {
    const channelLower = channel.toLowerCase();
    if (channelLower === "instagram") return "bg-gradient-to-r from-purple-500 to-pink-500";
    if (channelLower === "whatsapp") return "bg-green-500";
    if (channelLower === "linkedin") return "bg-blue-600";
    return "bg-gray-500";
  };

  if (loading) {
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
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-3 border-t border-gray-100 dark:border-gray-800">
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {reviews.length > 0 && (
          <span className="text-sm font-medium text-warning-600 dark:text-warning-400">
            {reviews.length} pending
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No pending reviews</p>
          <p className="text-sm mt-1">All caught up!</p>
        </div>
      ) : (
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
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Channel
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {reviews.map((review) => (
                <TableRow key={review.id} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <TableCell className="py-3">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {review.username}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 max-w-xs truncate">
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
                  <TableCell className="py-3">
                    <span className={`text-xs text-white px-2 py-0.5 rounded ${getChannelBadge(review.channel)}`}>
                      {review.channel}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
