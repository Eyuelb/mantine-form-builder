import "@/styles/globals.css";

import { GlobalProviders } from "@/providers/app.providers";
import { cn } from "@/utils/class";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bankos Insurance",
  description: "Bankos Insurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
