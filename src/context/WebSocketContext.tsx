"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useWebSocket, WebSocketMessage } from "@/hooks/useWebSocket";
import { useAuth } from "@/context/AuthContext";

// Event types for type safety
export type WebSocketEventType =
  | "connected"
  | "new_conversation"
  | "classification_complete"
  | "response_sent"
  | "kpi_update"
  | "account_status"
  | "pong";

export interface NewConversationEvent {
  id: string;
  sender_name: string;
  message_preview: string;
  channel: string;
  status: string;
}

export interface ClassificationEvent {
  conversation_id: string;
  classification: string;
  confidence: number;
  is_automated: boolean;
  sender_name: string;
}

export interface ResponseSentEvent {
  conversation_id: string;
  response_preview: string;
  response_time_ms: number;
  sender_name: string;
}

export interface KPIUpdateEvent {
  [key: string]: unknown;
}

export interface AccountStatusEvent {
  account_id: string;
  provider: string;
  status: string;
}

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;

  // Event subscriptions
  onNewConversation: (callback: (event: NewConversationEvent) => void) => () => void;
  onClassificationComplete: (callback: (event: ClassificationEvent) => void) => () => void;
  onResponseSent: (callback: (event: ResponseSentEvent) => void) => () => void;
  onKPIUpdate: (callback: (event: KPIUpdateEvent) => void) => () => void;
  onAccountStatus: (callback: (event: AccountStatusEvent) => void) => () => void;

  // Utility functions
  ping: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [eventCallbacks, setEventCallbacks] = useState<{
    [key: string]: Set<(data: unknown) => void>;
  }>({});

  const handleMessage = useCallback((message: WebSocketMessage) => {
    const callbacks = eventCallbacks[message.event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(message.data));
    }
  }, [eventCallbacks]);

  const { isConnected, lastMessage, ping, connect, disconnect } = useWebSocket({
    onMessage: handleMessage,
    onConnect: () => {
      console.log("[WebSocket] Connected to dashboard");
    },
    onDisconnect: () => {
      console.log("[WebSocket] Disconnected from dashboard");
    },
  });

  // Reconnect when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      connect();
    } else {
      disconnect();
    }
  }, [isAuthenticated, connect, disconnect]);

  // Helper to create subscription functions
  const createSubscription = useCallback(
    <T,>(eventType: string) => {
      return (callback: (event: T) => void) => {
        setEventCallbacks((prev) => {
          const callbacks = prev[eventType] || new Set();
          callbacks.add(callback as (data: unknown) => void);
          return { ...prev, [eventType]: callbacks };
        });

        // Return unsubscribe function
        return () => {
          setEventCallbacks((prev) => {
            const callbacks = prev[eventType];
            if (callbacks) {
              callbacks.delete(callback as (data: unknown) => void);
            }
            return { ...prev };
          });
        };
      };
    },
    []
  );

  const value: WebSocketContextType = {
    isConnected,
    lastMessage,
    onNewConversation: createSubscription<NewConversationEvent>("new_conversation"),
    onClassificationComplete: createSubscription<ClassificationEvent>("classification_complete"),
    onResponseSent: createSubscription<ResponseSentEvent>("response_sent"),
    onKPIUpdate: createSubscription<KPIUpdateEvent>("kpi_update"),
    onAccountStatus: createSubscription<AccountStatusEvent>("account_status"),
    ping,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  }
  return context;
}
