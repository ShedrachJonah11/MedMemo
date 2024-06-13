// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import SessionProvider from "./sessionProvider";
export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
