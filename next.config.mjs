import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      // "@mantine/hooks",
      // "@mantine/dates",
      // "@mantine/notifications",
      // "@mantine/modals",
      // "@tabler/icons-react",
      // "tailwindcss",
    ],
  },
});
