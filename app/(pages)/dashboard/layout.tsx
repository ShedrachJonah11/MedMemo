"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Providers } from "@/app/providers/appProvider";
import Nav from "@/app/components/sideNav";
import { Header } from "@/app/components/Header";
import CustomModal from "@/app/components/CustomModal";
const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import { CloseCircle } from "iconsax-react";
import Link from "next/link";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${inter.className} absolute h-screen w-full`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex bg-[#E9ECEF]" suppressHydrationWarning>
            {pathname !== "/auth/login" && <Nav openModal={openModal} />}
            <div className="h-screen w-full overflow-y-auto">
              <div className=" flex-col">
                {pathname !== "/auth/login" && <Header />}
                <div
                  suppressHydrationWarning
                  className="pt-6 sm:px-6 px-3 flex"
                >
                  <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex flex-col w-full items-center">
                      <div className="relative w-full flex justify-center items-center mb-[24px]">
                        <Image
                          src={"/logout.svg"}
                          width={50}
                          height={50}
                          alt=""
                        />
                        <button
                          className="absolute right-0 top-0"
                          onClick={closeModal}
                        >
                          <CloseCircle size="24" color="#343A40" />
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-1 mb-[32px]">
                        <p className="text-center text-[20px] font-[600]">
                          Are you sure you want to log out?
                        </p>
                        <p className="text-center text-[#71839B] text-[14px]">
                          If you log out, you will have to sign back in to
                          continue sessions.
                        </p>
                      </div>

                      <div className="flex justify-between items-center gap-[24px] w-full">
                        <button
                          className="w-[50%] h-[56px] font-[600] text-[16px] text-[#CD0C0C] border-[3px] border-[#CD0C0C] flex justify-center items-center rounded-[8px]"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <Link
                          href={"/"}
                          className="w-[50%] h-[56px] font-[600] text-[16px] text-[white] bg-[#CD0C0C] border-[3px] border-[#CD0C0C] flex justify-center items-center rounded-[8px]"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  </CustomModal>
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
