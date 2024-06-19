"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeNav = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="px-[24px] py-3 flex justify-between items-center">
        <Image src={"/Logo.svg"} width={200} height={48} alt="" />

        <div className="flex justify-center items-center gap-[32px]">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-[#343A40]" : "text-[#71839B]"
            } px-4 py-[10px] text-[18px] font-[600]`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${
              pathname === "/about" ? "text-[#343A40]" : "text-[#71839B]"
            } px-4 py-[10px] text-[18px] font-[600]`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`${
              pathname === "/contact" ? "text-[#343A40]" : "text-[#71839B]"
            } px-4 py-[10px] text-[18px] font-[600]`}
          >
            Contact
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Link href={'/auth/login'} className="h-[56px] flex justify-center items-center px-4 text-[#007BFF] text-[16px] font-[600]">
            Log in
          </Link>
          <Link href={'/auth/signup'} className="h-[56px] flex justify-center items-center px-[32px] rounded-[8px] text-white bg-[#007BFF] text-[16px] font-[600]">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
