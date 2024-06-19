"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="px-4 py-3 flex justify-between items-center md:px-6 lg:px-8 relative">
      <Image src={"/Logo.svg"} width={200} height={48} alt="Logo" />

      <div className="hidden md:flex justify-center items-center gap-8">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-[#343A40]" : "text-[#71839B]"
          } px-4 py-2 text-lg font-semibold`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`${
            pathname === "/about" ? "text-[#343A40]" : "text-[#71839B]"
          } px-4 py-2 text-lg font-semibold`}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className={`${
            pathname === "/contact" ? "text-[#343A40]" : "text-[#71839B]"
          } px-4 py-2 text-lg font-semibold`}
        >
          Contact
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center gap-4">
        <Link
          href={"/auth/login"}
          className="h-14 flex justify-center items-center px-4 text-[#007BFF] text-base font-semibold"
        >
          Log in
        </Link>
        <Link
          href={"/auth/signup"}
          className="h-14 flex justify-center items-center px-8 rounded-lg text-white bg-[#007BFF] text-base font-semibold"
        >
          Sign Up
        </Link>
      </div>

      <div className="md:hidden">
        <button
          className="text-[#343A40] focus:outline-none"
          aria-label="Open Menu"
          onClick={toggleNav}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isNavOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 p-4 md:hidden">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-[#343A40]" : "text-[#71839B]"
            } px-4 py-2 text-lg font-semibold`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${
              pathname === "/about" ? "text-[#343A40]" : "text-[#71839B]"
            } px-4 py-2 text-lg font-semibold`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`${
              pathname === "/contact" ? "text-[#343A40]" : "text-[#71839B]"
            } px-4 py-2 text-lg font-semibold`}
          >
            Contact
          </Link>

          <div className="flex flex-col items-center gap-4">
            <Link
              href={"/auth/login"}
              className="h-14 w-full flex justify-center items-center px-4 text-[#007BFF] text-base font-semibold"
            >
              Log in
            </Link>
            <Link
              href={"/auth/signup"}
              className="h-14 w-full flex justify-center items-center px-8 rounded-lg text-white bg-[#007BFF] text-base font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
