"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../global.css";
import Nav from "../../components/sideNav";
import { Providers } from "../../providers/appProvider";
import { Header } from "../../components/Header";
import { Suspense } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
          <div className="flex bg-[#FAFAFA]" suppressHydrationWarning>
            {pathname !== "/admin/auth/login" && <Nav />}
            <div className="h-screen w-full overflow-y-auto">
              <div className="sm:px-6 px-3 flex flex-col">
                {pathname !== "/admin/auth/login" && <Header />}
                <div suppressHydrationWarning className="pt-6">
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
