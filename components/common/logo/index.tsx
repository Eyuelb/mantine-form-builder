import Link from "next/link";
import { Text, VisuallyHidden } from "@mantine/core";
export function Logo() {
  return (
    <Link href="/" className="flex items-center " aria-label="Bankos">
      <VisuallyHidden>Welcome to Allora</VisuallyHidden>
      <Text fw={600} fz={17}>
        Allora
      </Text>
    </Link>
  );
}
