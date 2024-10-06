'use client';

import { AppShell, Box } from '@mantine/core';
import { useDisclosure, useElementSize } from '@mantine/hooks';
import { createContext, PropsWithChildren, useMemo } from 'react';
import { MainHeaderLayout } from './main-header-layout';
interface AppLayoutContextType {
  sideBarOpened?: boolean;
  toggleSidebarExpanded?: () => void;
}
export const AppLayoutContext = createContext<AppLayoutContextType>({});

export const MainLayout = (props: PropsWithChildren) => {
  const [sideBarOpened, { toggle }] = useDisclosure();
  const { ref, height } = useElementSize();

  const value = useMemo(
    () => ({
      sideBarOpened,
      toggleSidebarExpanded: toggle,
    }),
    [sideBarOpened, toggle],
  );
  return (
    <AppLayoutContext.Provider value={value}>
      <AppShell
        header={{ height, }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { desktop: true, mobile: !sideBarOpened },
        }}
        padding="md"
      >
        <AppShell.Header h={height} className='border-0'>
          <Box ref={ref}>
            <MainHeaderLayout />
          </Box>
        </AppShell.Header>
        <AppShell.Navbar>
          <MainHeaderLayout.Mobile />
        </AppShell.Navbar>
        <AppShell.Main bg="var(--mantine-color-body)">
          {props.children}
        </AppShell.Main>
      </AppShell>
    </AppLayoutContext.Provider>
  );
};
