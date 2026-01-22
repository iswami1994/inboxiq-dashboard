import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | InboxIQ",
  description: "Sign in to your InboxIQ account to manage your Instagram and WhatsApp DM automation",
};

export default function SignIn() {
  return <SignInForm />;
}
