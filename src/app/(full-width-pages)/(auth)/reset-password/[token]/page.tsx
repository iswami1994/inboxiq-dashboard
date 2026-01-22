import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password | InboxIQ",
  description: "Set a new password for your InboxIQ account",
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordConfirm({ params }: PageProps) {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
}
