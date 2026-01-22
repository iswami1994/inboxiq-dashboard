"use client";

import React, { useState } from "react";
import { ConnectedAccount, connectAccount, disconnectAccount, reconnectAccount } from "@/lib/api";

interface ConnectAccountCardProps {
  provider: "INSTAGRAM" | "WHATSAPP" | "LINKEDIN";
  connectedAccount?: ConnectedAccount;
  onUpdate: () => void;
}

const providerConfig = {
  INSTAGRAM: {
    name: "Instagram",
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-pink-500 to-purple-600",
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  WHATSAPP: {
    name: "WhatsApp",
    color: "from-green-500 to-green-600",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  LINKEDIN: {
    name: "LinkedIn",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-700",
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
};

export default function ConnectAccountCard({
  provider,
  connectedAccount,
  onUpdate,
}: ConnectAccountCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const config = providerConfig[provider];

  const isConnected = connectedAccount?.status === "ACTIVE";
  const needsReconnection = connectedAccount?.status === "DISCONNECTED" || connectedAccount?.status === "ERROR";

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await connectAccount(provider);
      // Redirect to Unipile hosted auth
      window.location.href = response.auth_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect");
      setIsLoading(false);
    }
  };

  const handleReconnect = async () => {
    if (!connectedAccount) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await reconnectAccount(connectedAccount.id);
      window.location.href = response.auth_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reconnect");
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connectedAccount) return;

    if (!confirm(`Are you sure you want to disconnect your ${config.name} account?`)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await disconnectAccount(connectedAccount.id);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all hover:shadow-lg cursor-pointer">
      {/* Background gradient accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${config.bgColor} opacity-10 rounded-bl-full`} />

      <div className="relative">
        {/* Provider Icon */}
        <div className={`inline-flex p-3 rounded-xl ${config.bgColor} mb-4`}>
          {config.icon}
        </div>

        {/* Provider Name & Status */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {config.name}
          </h3>
          {isConnected && connectedAccount?.display_name && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connected as {connectedAccount.display_name}
            </p>
          )}
          {needsReconnection && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Connection lost - needs reconnection
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded">
            {error}
          </div>
        )}

        {/* Status Badge */}
        {connectedAccount && (
          <div className="mb-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isConnected
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : needsReconnection
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  isConnected
                    ? "bg-green-500"
                    : needsReconnection
                    ? "bg-amber-500"
                    : "bg-gray-500"
                }`}
              />
              {connectedAccount.status}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!connectedAccount && (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg ${config.bgColor} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
            >
              {isLoading ? "Connecting..." : "Connect"}
            </button>
          )}

          {needsReconnection && (
            <button
              onClick={handleReconnect}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Reconnecting..." : "Reconnect"}
            </button>
          )}

          {connectedAccount && (
            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "..." : "Disconnect"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
