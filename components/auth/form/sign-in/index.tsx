"use client";
import { primaryColor } from "@/styles/theme";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Center, rem, useComputedColorScheme } from "@mantine/core";

export function AuthSignIn() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <Center>
      <SignIn />
    </Center>
  );
}
