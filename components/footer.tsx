import Image from "next/image";
import Link from "next/link";
import logo from "../public/vetmemologo.svg";
import { Button } from "@nextui-org/react";

function Footer() {
  const date = new Date();

  return (
    <div className="bg-[#008080] h-full rounded-t-xl py-6 relative  flex flex-col md:px-32 z-0">
      <div className="max-w-[1280px] sm:px-12 px-10 flex sm:flex-row flex-col rounded-2xl py-10 gap-5 justify-between">
        <div className="">
          <Image src={logo} alt="logo" width={200} height={50} />
        </div>

        {/* Content */}
        <div className="flex gap-10 md:gap-24 flex-wrap ">
          <ul className="w-[200px]">
            
            <li className="mb-6 text-[#F3F4F6] font-light"><Link href={"auth/login"}>Login</Link></li>
            <li className="mb-6 text-[#F3F4F6] font-light">Try Demo</li>
          </ul>
          <ul className="">
            <li className="text-[#F3F4F6] text-xl mb-6 font-light"><Link href={"about"}>About Us</Link></li>
            <li className="mb-6 text-[#F3F4F6] font-light">Testimonials</li>
          </ul>
          <div className="flex flex-col gap-2">
            <span className="text-[#F3F4F6] text-lg font-light">
              Still have questions?
            </span>
           
            <Link href="mailto:info@vetmemos.com">
              <Button size="md" className="bg-white w-52 font-semibold">
                Contact Us
              </Button>
            </Link>
            <div style={{display:"flex",gap:"10px",justifyContent:"end",marginTop:"10px"}}>
              <Link href={"https://instagram.com/vetmemos"}>
              <img src="/instagram.png" alt="" style={{width:"20px"}} />
              </Link>
              <Link href={"https://twitter.com/vetmemos"}>
              <img src="/twitter.png" alt="" style={{width:"20px"}} />
              </Link>
              <Link href={"https://www.facebook.com/profile.php?id=61556757883017"}>
              <img src="/facebook.png" alt="" style={{width:"20px"}} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between py-4 sm:px-10 px-3 border-t border-white text-gray-300">
        <div className="mb-4 sm:mb-0">
          <p className="font-light">
            {" "}
            <span className="text-xl">&copy;</span> {date.getUTCFullYear()}{" "}
            VetMemos All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
          <p className="font-light"><Link href={"privacy"}>Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
