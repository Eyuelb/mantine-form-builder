import type { Metadata } from "next";
import { AuthSignIn } from "@/components/auth";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin",
};

export default function SignIn() {
  return <AuthSignIn />;
}
