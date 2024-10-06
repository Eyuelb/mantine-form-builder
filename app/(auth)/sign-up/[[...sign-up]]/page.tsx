import type { Metadata } from "next";

import { AuthSignUp } from "@/components/auth";

export const metadata: Metadata = {
  title: "Signup",
  description:
    "Signup",
};

export default function SignUp() {
  return <AuthSignUp />;
}
