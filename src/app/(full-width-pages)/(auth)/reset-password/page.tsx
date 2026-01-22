import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | InboxIQ",
  description: "Reset your InboxIQ account password",
};

export default function ResetPassword() {
  return <ForgotPasswordForm />;
}
