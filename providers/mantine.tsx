import { theme as baseTheme } from '@/styles/theme';
import {
  ColorSchemeScript,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Partial<MantineThemeOverride> = {
    ...baseTheme,
    colors: {
      primary: [
        "#f6eefc",
        "#e7d8f4",
        "#cfadea",
        "#b57ee1",
        "#9f58d9",
        "#9240d5",
        "#8c33d4",
        "#7927bc",
        "#6b22a8",
        "#5d1a93",
      ],
    }
  };

  return (
    <MantineProvider theme={theme}>
      <ColorSchemeScript />
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
