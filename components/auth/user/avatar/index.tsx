'use client';

import { primaryColor } from '@/styles/theme';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ActionIcon,Anchor,VisuallyHidden } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

export function UserAvatar() {

  const signedInPart = (
    <SignedIn>
      <UserButton
        appearance={{
          variables: {
            colorPrimary: primaryColor,
          },
          elements: {
            userPreviewMainIdentifier: {
              color: 'inherit',
            },
            userPreviewSecondaryIdentifier: {
              color: 'gray',
            },
            userButtonPopoverActionButton: {
              color: 'inherit',
            },
            userButtonPopoverActionButtonText: {
              color: 'inherit',
            },
            userButtonPopoverFooter: {
              '& .cl-internal-wkkub3': {
                color: 'gray',
              },
            },
          },
        }}
        userProfileMode='navigation'
        userProfileUrl='/user-account'
        afterSignOutUrl='/'
      />
    </SignedIn>
  );

  const signedOutPart = (
    <SignedOut>
      <SignInButton>
        <Anchor aria-label='User placeholder avatar' variant="gradient">
          <IconUser size={18}/>
          <VisuallyHidden>User Placeholder Avatar</VisuallyHidden>
        </Anchor>
      </SignInButton>
    </SignedOut>
  );

  return (
    <>
      {signedInPart}
      {signedOutPart}
    </>
  );
}
