/**
 * API client for InboxIQ backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthResponse {
  user: User;
  tokens: TokenResponse;
}

export interface ConnectedAccount {
  id: string;
  user_id: string;
  unipile_account_id: string;
  provider: "INSTAGRAM" | "WHATSAPP" | "LINKEDIN";
  display_name: string | null;
  profile_picture_url: string | null;
  status: "PENDING" | "ACTIVE" | "DISCONNECTED" | "ERROR";
  created_at: string;
}

export interface ConnectAccountResponse {
  auth_url: string;
}

export interface ApiError {
  detail: string;
}

// Token management
const TOKEN_KEY = "inboxiq_access_token";
const REFRESH_TOKEN_KEY = "inboxiq_refresh_token";

// Helper to set a cookie
function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Helper to delete a cookie
function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  // Also set cookies for middleware access
  setCookie(TOKEN_KEY, accessToken, 7);
  setCookie(REFRESH_TOKEN_KEY, refreshToken, 7);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  // Also clear cookies
  deleteCookie(TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
}

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const accessToken = getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Try to parse error message
    try {
      const error: ApiError = await response.json();
      throw new Error(error.detail || `API error: ${response.status}`);
    } catch {
      throw new Error(`API error: ${response.status}`);
    }
  }

  return response.json();
}

// Auth API
export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  setTokens(response.tokens.access_token, response.tokens.refresh_token);
  return response;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setTokens(response.tokens.access_token, response.tokens.refresh_token);
  return response;
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await apiRequest<{ access_token: string; token_type: string }>(
      "/auth/refresh",
      {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    localStorage.setItem(TOKEN_KEY, response.access_token);
    return response.access_token;
  } catch {
    clearTokens();
    return null;
  }
}

export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>("/auth/me");
}

export async function logout(): Promise<void> {
  clearTokens();
}

export async function requestPasswordReset(email: string): Promise<void> {
  await apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, new_password: newPassword }),
  });
}

// Accounts API
export interface ConnectedAccountsResponse {
  accounts: ConnectedAccount[];
  total: number;
}

export async function getConnectedAccounts(): Promise<ConnectedAccountsResponse> {
  return apiRequest<ConnectedAccountsResponse>("/accounts");
}

export async function connectAccount(
  provider: "INSTAGRAM" | "WHATSAPP" | "LINKEDIN"
): Promise<ConnectAccountResponse> {
  return apiRequest<ConnectAccountResponse>("/accounts/connect", {
    method: "POST",
    body: JSON.stringify({ provider }),
  });
}

export async function reconnectAccount(accountId: string): Promise<ConnectAccountResponse> {
  return apiRequest<ConnectAccountResponse>("/accounts/reconnect", {
    method: "POST",
    body: JSON.stringify({ account_id: accountId }),
  });
}

export async function disconnectAccount(accountId: string): Promise<void> {
  await apiRequest(`/accounts/${accountId}`, {
    method: "DELETE",
  });
}

// Dashboard API
export interface DashboardSummary {
  kpis: Array<{
    label: string;
    value: string;
    trend: number;
    gradient: string;
  }>;
  volume_trend: Array<{
    day: string;
    total: number;
    automated: number;
  }>;
  classification_breakdown: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  response_effectiveness: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiRequest<DashboardSummary>("/dashboard/summary");
}

export async function getDashboardAnalytics(): Promise<unknown> {
  return apiRequest("/dashboard/analytics");
}

export async function getDashboardOperations(): Promise<unknown> {
  return apiRequest("/dashboard/operations");
}

export async function getDashboardPipeline(): Promise<unknown> {
  return apiRequest("/dashboard/pipeline");
}

// Conversations API
export interface RecentClassification {
  id: string;
  time: string;
  classification: string;
  needs_review: boolean;
  sender_name: string | null;
  channel: string;
}

export interface PendingReview {
  id: string;
  username: string;
  message: string;
  classification: string;
  wait_time: string;
  channel: string;
}

export interface KPIMetrics {
  total_conversations: number;
  automation_rate: number;
  manual_review_count: number;
  collab_leads: number;
  avg_response_time_ms: number | null;
  trends: {
    total_conversations: number;
    automation_rate: number;
    manual_review: number;
    collab_leads: number;
  };
}

export interface ConversationVolume {
  day: string;
  date: string;
  total: number;
  automated: number;
  manual: number;
}

export async function getRecentClassifications(limit: number = 10): Promise<RecentClassification[]> {
  return apiRequest<RecentClassification[]>(`/conversations/recent?limit=${limit}`);
}

export async function getPendingReviews(limit: number = 10): Promise<PendingReview[]> {
  return apiRequest<PendingReview[]>(`/conversations/pending?limit=${limit}`);
}

export async function getKPIMetrics(): Promise<KPIMetrics> {
  return apiRequest<KPIMetrics>("/conversations/kpis");
}

export async function getConversationVolume(days: number = 7): Promise<ConversationVolume[]> {
  return apiRequest<ConversationVolume[]>(`/conversations/volume?days=${days}`);
}
