"use client";

import { primaryColor } from "@/styles/theme";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Container, Paper, useComputedColorScheme } from "@mantine/core";
import "./styles.module.css";

const appearance: any = {
  baseTheme: undefined,
  elements: {
    headerSubtitle: "hidden",
    navbar: "hidden",
    navbarMobileMenuButton: "hidden",
    rootBox: {
      width: "revert",
    },
    // navbar: {
    //   color: "inherit",
    //   border: "unset",
    //   borderInlineEnd: "1px solid var(--mantine-color-dark-light)",
    // },
    navbarButton: {
      color: "inherit",
    },
    // headerTitle: {
    //   color: "inherit",
    // },
    profileSectionTitleText: {
      color: "inherit",
    },
  },
  variables: {
    borderRadius: "0.25rem",
  },
};
export function UserDetails() {
  return (
    <Container>
      <Paper className="p-4" >
        <UserProfile
          appearance={{
            ...appearance,
          }}
          routing="path"
          path="/user-account"
        />
      </Paper>
    </Container>
  );
}
