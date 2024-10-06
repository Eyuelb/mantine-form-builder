import { Paper } from "@mantine/core";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="flex h-screen  items-center justify-center"
       style={{
        background:'linear-gradient(36deg, var(--mantine-primary-color-filled) 4%, var(--mantine-primary-color-filled) 10%, var(--mantine-color-body) 100%)'
       }}
      >
        <Paper className="h-fit rounded-lg " shadow="md">{children}</Paper>
      </div>
    </>
  );
}
