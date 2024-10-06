"use client";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { AuthLoader } from "@/components/auth";
import { useComputedColorScheme } from "@mantine/core";
import { neobrutalism } from "@clerk/themes";
import { primaryColor } from "@/styles/theme";
const ClerkClientProvider = ({ children }: PropsWithChildren) => {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <ClerkProvider
      appearance={{
        variables: {
          ...(computedColorScheme === "dark"
            ? { baseTheme: neobrutalism }
            : {}),
          fontFamily: "var(--mantine-font-family)",
          colorPrimary: primaryColor,
        },
        elements: {
          card: {
            color: "var(--mantine-color-text)",
            backdropFilter: "var(--mantine-blur-default)",
            borderRadius: "var(--mantine-radius-default)",
          },
          // footer:'hidden',
        },
      }}
    >
      <ClerkLoading>
        <AuthLoader>Processing...</AuthLoader>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
};

export { ClerkClientProvider };
