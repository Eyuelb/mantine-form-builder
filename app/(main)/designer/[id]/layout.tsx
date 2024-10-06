// src/components/Layout.tsx
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return <>{children}</>
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">{"leftSidebar"}</div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-4">{children}</div>

      {/* Right Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">{"rightSidebar"}</div>
    </div>
  );
};

export default Layout;
