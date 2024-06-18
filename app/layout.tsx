import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/appProvider";
import { Suspense } from "react";
import HomeNav from "./components/HomeNav";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medmemo",
  description: "make medical record keeping easier",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} absolute h-screen w-full bg-[#E9ECEF]`}
        suppressHydrationWarning
      >
        <Providers>
          <HomeNav />
          <Suspense>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
