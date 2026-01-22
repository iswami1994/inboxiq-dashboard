import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | InboxIQ",
  description: "Create your InboxIQ account to automate your Instagram and WhatsApp DM management",
};

export default function SignUp() {
  return <SignUpForm />;
}
