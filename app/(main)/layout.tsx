import { MainHeaderLayout } from "@/components/common/layouts/main-header-layout";
import { Box } from "@mantine/core";
import React, { PropsWithChildren } from "react";
const Layout = (props: PropsWithChildren) => {
  return (
    <Box>
      <MainHeaderLayout />
      {props.children}
    </Box>
  );
};

export default Layout;
