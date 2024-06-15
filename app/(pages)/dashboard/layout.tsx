"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Providers } from "@/app/providers/appProvider";
import Nav from "@/app/components/sideNav";
import { Header } from "@/app/components/Header";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Medmemo",
//   description: "make medical record keeping easier",
//   icons: "/icon.svg",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${inter.className} absolute h-screen w-full`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex bg-[#E9ECEF]" suppressHydrationWarning>
            {pathname !== "/auth/login" && <Nav />}
            <div className="h-screen w-full overflow-y-auto">
              <div className=" flex-col">
                {pathname !== "/auth/login" && <Header />}
                <div
                  suppressHydrationWarning
                  className="pt-6 sm:px-6 px-3 flex"
                >
                  <Suspense>{children}</Suspense>
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
