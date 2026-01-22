"use client";
import React, { useEffect, useState } from "react";
import { getRecentClassifications, RecentClassification } from "@/lib/api";
import { useWebSocketContext, ClassificationEvent } from "@/context/WebSocketContext";

type ClassificationType = "neutral" | "question" | "unclear" | "collab" | "unknown";

interface LiveMessage {
  id: string;
  time: string;
  classification: ClassificationType;
  needsReview: boolean;
  senderName?: string;
}

function normalizeClassification(classification: string): ClassificationType {
  const lower = classification.toLowerCase();
  if (lower === "neutral" || lower === "greeting" || lower === "thanks") return "neutral";
  if (lower === "question" || lower === "support") return "question";
  if (lower === "collab" || lower === "collaboration") return "collab";
  if (lower === "unclear") return "unclear";
  return "neutral";
}

export default function LiveFeed() {
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { onClassificationComplete, onNewConversation } = useWebSocketContext();

  useEffect(() => {
    // Initial fetch
    async function fetchRecentClassifications() {
      try {
        const data = await getRecentClassifications(10);
        setMessages(
          data.map((item: RecentClassification) => ({
            id: item.id,
            time: item.time,
            classification: normalizeClassification(item.classification),
            needsReview: item.needs_review,
            senderName: item.sender_name || undefined,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch recent classifications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentClassifications();

    // Subscribe to classification events
    const unsubClassification = onClassificationComplete((event: ClassificationEvent) => {
      const newMessage: LiveMessage = {
        id: event.conversation_id,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
        classification: normalizeClassification(event.classification),
        needsReview: !event.is_automated,
        senderName: event.sender_name,
      };

      setMessages((prev) => {
        // Add new message at the top, keep only 10
        const updated = [newMessage, ...prev.filter((m) => m.id !== event.conversation_id)];
        return updated.slice(0, 10);
      });
    });

    // Also subscribe to new conversations
    const unsubNewConversation = onNewConversation((event) => {
      const newMessage: LiveMessage = {
        id: event.id,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
        classification: "unclear",  // Pending classification
        needsReview: true,
        senderName: event.sender_name,
      };

      setMessages((prev) => {
        const updated = [newMessage, ...prev.filter((m) => m.id !== event.id)];
        return updated.slice(0, 10);
      });
    });

    return () => {
      unsubClassification();
      unsubNewConversation();
    };
  }, [onClassificationComplete, onNewConversation]);

  const getClassificationColor = (classification: ClassificationType) => {
    switch (classification) {
      case "neutral":
        return "text-gray-600 dark:text-gray-400";
      case "question":
        return "text-blue-600 dark:text-blue-400";
      case "unclear":
        return "text-warning-600 dark:text-warning-400";
      case "collab":
        return "text-success-600 dark:text-success-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  if (loading) {
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
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.02] animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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

      {messages.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No recent messages</p>
          <p className="text-sm mt-1">New messages will appear here in real-time</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-12">
                  {msg.time}
                </span>
                <span className={`text-sm font-medium ${getClassificationColor(msg.classification)}`}>
                  {msg.classification}
                </span>
                {msg.senderName && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-24">
                    {msg.senderName}
                  </span>
                )}
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
      )}
    </div>
  );
}
