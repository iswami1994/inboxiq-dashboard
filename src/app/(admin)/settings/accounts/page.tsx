"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ConnectAccountCard from "@/components/inboxiq/ConnectAccountCard";
import { getConnectedAccounts, ConnectedAccount } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AccountsSettingsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Check for connection status from URL params
  const connectedStatus = searchParams.get("connected");
  const reconnectedStatus = searchParams.get("reconnected");
  const providerParam = searchParams.get("provider");

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await getConnectedAccounts();
      setAccounts(response.accounts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load accounts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccounts();
    }
  }, [isAuthenticated]);

  // Get connected account for each provider
  const getAccountForProvider = (provider: "INSTAGRAM" | "WHATSAPP" | "LINKEDIN") => {
    return accounts.find((acc) => acc.provider === provider);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">
          Please sign in to manage your connected accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Connected Accounts
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your social media accounts to enable InboxIQ to manage your DMs
        </p>
      </div>

      {/* Connection Status Messages */}
      {connectedStatus === "success" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-400">
            {providerParam
              ? `Your ${providerParam.charAt(0).toUpperCase() + providerParam.slice(1)} account has been connected successfully!`
              : "Account connected successfully!"}
          </p>
        </div>
      )}

      {connectedStatus === "failed" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-400">
            Failed to connect your account. Please try again.
          </p>
        </div>
      )}

      {reconnectedStatus === "success" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-400">
            Account reconnected successfully!
          </p>
        </div>
      )}

      {reconnectedStatus === "failed" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-400">
            Failed to reconnect your account. Please try again.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
        </div>
      ) : (
        <>
          {/* Account Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ConnectAccountCard
              provider="INSTAGRAM"
              connectedAccount={getAccountForProvider("INSTAGRAM")}
              onUpdate={fetchAccounts}
            />
            <ConnectAccountCard
              provider="WHATSAPP"
              connectedAccount={getAccountForProvider("WHATSAPP")}
              onUpdate={fetchAccounts}
            />
            <ConnectAccountCard
              provider="LINKEDIN"
              connectedAccount={getAccountForProvider("LINKEDIN")}
              onUpdate={fetchAccounts}
            />
          </div>

          {/* Info Section */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              How it works
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-0.5">1.</span>
                <span>Click "Connect" on any platform to securely link your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-0.5">2.</span>
                <span>
                  You&apos;ll be redirected to authenticate with the platform directly
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-0.5">3.</span>
                <span>
                  Once connected, InboxIQ will automatically classify and respond to your DMs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-0.5">4.</span>
                <span>
                  You can disconnect at any time - your data stays private and secure
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
