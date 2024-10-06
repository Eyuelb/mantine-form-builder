'use client';

import { primaryColor } from '@/styles/theme';
import { SignUp } from '@clerk/nextjs';
import { Center, rem } from '@mantine/core';

export function AuthSignUp() {

  return (
    <Center>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: primaryColor,
          },
          elements: {
            card: {
              boxShadow: 'unset',
            },
            headerTitle: {
              color: 'inherit',
            },
            formFieldLabel: {
              color: 'inherit',
            },
            footerActionText: {
              color: 'inherit',
            },
          },
        }}
      />
    </Center>
  );
}
