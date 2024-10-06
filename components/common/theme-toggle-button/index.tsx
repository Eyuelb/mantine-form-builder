'use client';
import {
  ThemeIconProps,
  ThemeIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { memo, useMemo } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { iconDefaultProps } from '../../../config/icon';
import TooltipButton from '../tooltip-button';

type Props = ThemeIconProps;

export const ThemeToggleButton = memo((props: Props) => {
  const isMounted = useIsMounted();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const color = useMemo(() => computedColorScheme, [computedColorScheme]);
  const icon =
    isMounted && color === 'dark' ? (
      <IconSun   {...iconDefaultProps} />
    ) : (
      <IconMoon  {...iconDefaultProps} />
    );
  return (
    
    <TooltipButton
      tooltip={color === 'dark'? 'Light Mode' :'Dark Mode'}
      className=" cursor-pointer"
      onClick={() => setColorScheme(color === 'light' ? 'dark' : 'light')}
      variant="transparent"
      color="current"
    >
      {icon}
    </TooltipButton>
  );
});
ThemeToggleButton.displayName = 'ThemeToggleButton';

