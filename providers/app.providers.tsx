import { PropsWithChildren } from "react";
import RootStyleRegistry from "./mantine";
import AppProgressBar from "@/components/common/progress-bar";
import { ClerkClientProvider } from "./clerk.provider";

function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <RootStyleRegistry>
      {/* <ClerkClientProvider> */}
        <AppProgressBar>{children}</AppProgressBar>
      {/* </ClerkClientProvider> */}
    </RootStyleRegistry>
  );
}

export { GlobalProviders };
