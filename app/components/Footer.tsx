"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
      const pathname = usePathname();

    return (
      <div className="p-[80px] bg-[#007BFF] flex flex-col gap-[48px] items-start w-full">
        <div className="flex justify-between items-center w-full">
          <Image src={"/footLogo.svg"} width={170} height={92} alt="" />
          <button className="bg-white text-[#007BFF] h-[56px] rounded-[8px] px-[32px] font-[600] text-[16px]">
            Sign Up for Free
          </button>
        </div>

        <div className="flex justify-between items-center w-full">
          <p className="w-[25%] text-white font-[400]">
            MedMemo is a digital platform designed to streamline the
            documentation process for medical professionals
          </p>
          <div className="flex justify-center items-center gap-[32px] text-white">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "font-[400]" : "font-[500] "
              } px-4 py-[10px] text-[18px]`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                pathname === "/about" ? "font-[400]" : "font-[500] "
              } px-4 py-[10px] text-[18px]`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`${
                pathname === "/contact" ? "font-[400]" : "font-[500] "
              } px-4 py-[10px] text-[18px]`}
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex justify-start items-center gap-[32px]">
          <Link href={"/"}>
            <Image src={"/instagram.svg"} width={36} height={36} alt="" />
          </Link>
          <Link href={"/"}>
            <Image src={"/facebook.svg"} width={36} height={36} alt="" />
          </Link>
          <Link href={"/"}>
            <Image src={"/twitter.svg"} width={36} height={36} alt="" />
          </Link>
        </div>

        <div className="flex justify-between items-center w-full text-[16px] text-white">
          <p>Copyrights@2024 MedMemos. All rights reserved</p>
          <p>Privacy Policy</p>
          <p>Terms and Service</p>
        </div>
      </div>
    );
}
 
export default Footer;