"use client"
import {
  Box,
  Burger,
  Button,
  Flex,
  Group,
  rem,
  ScrollArea,
  UnstyledButton,
} from "@mantine/core";
import React, { useContext } from "react";
import { ThemeToggleButton } from "../theme-toggle-button";
import { AppLayoutContext } from "./main-layout";
import Link from "next/link";
import {IconBell, IconSearch, IconSettings } from "@tabler/icons-react";
import { Logo } from "../logo";
import TooltipButton from "../tooltip-button";
import { iconDefaultProps } from "../../../config/icon";
import { useActivePath } from "@/hooks/useActivePath";
export const links = [
  {
    label: "Home",
    link: "/",
  },
];
const MainHeaderLayout = () => {
  const { sideBarOpened, toggleSidebarExpanded } = useContext(AppLayoutContext);
  const isActive = useActivePath();
  const nav = links?.map((link, key) => (
    <Button
      className={`flex items-center px-3  hover:text-[var(--mantine-color-primary-4)] ${
        isActive(link.link)
          ? " border-b-[var(--mantine-color-primary-4)]  "
          : ""
      }`}
      key={key}
      component={Link}
      href={link.link ?? ""}
      fw={600}
      fz={15}
      h={26}
      radius={0}
      variant="transparent"
      color="current"
    >
      {link.label}
    </Button>
  ));

  return (
    <Box className="w-full flex flex-col items-center justify-between h-full px-4 sm:px-24 py-3">
      <Flex className="w-full flex-grow items-center" justify="space-between">
        <Group className="w-full" gap={20} flex={1}>
          <Logo />
          <Group gap={4} visibleFrom="sm" flex={1} justify="center">{nav}</Group>
        </Group>
        <Group visibleFrom="sm" gap={8}  >
          <TooltipButton variant="transparent" tooltip="Notification" color="current">
            <IconBell {...iconDefaultProps}/>
          </TooltipButton>
          <ThemeToggleButton />
        </Group>
        <Group hiddenFrom="sm">
          <Burger
            opened={sideBarOpened}
            onClick={toggleSidebarExpanded}
            size="sm"
          />
        </Group>
      </Flex>
    </Box>
  );
};
const MainHeaderMobileLayout = () => {
  const isActive = useActivePath();
  const nav = links?.map((link, key) => (
    <UnstyledButton
      className={`flex items-center px-3 rounded-sm ${
        isActive(link.link)
          ? " bg-[var(--mantine-primary-color-light)] "
          : ""
      }`}
      key={key}
      component={Link}
      href={link.link ?? ""}
      fw={500}
      fz={12}
      h={26}
    >
      {link.label}
    </UnstyledButton>
  ));
  return (
    <Box hiddenFrom="sm">
      <ScrollArea h={`calc(100vh - ${rem(80)})`}>
      {nav}
        <Group>
          <ThemeToggleButton />
        </Group>
      </ScrollArea>
    </Box>
  );
};
MainHeaderLayout.Mobile = MainHeaderMobileLayout;
export { MainHeaderLayout };
