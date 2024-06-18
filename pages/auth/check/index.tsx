import { getUserProfile, verifyAccount } from "@/application/api/apis";
import { storeJSONdata } from "@/application/utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { manualRefresher } from "@/application/api/axiosInstance";
import Image from "next/image";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import mail from "../../../public/mail.svg";
import bg from "../../../public/bgauth.svg";
import arrowback from "../../../public/menu2.svg";

export default function Check() {
  const [userData, setUserData] = useState<any>();

  const [isVeridfied, setVerifed] = useState(false);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <Card className="w-96 sm:w-[450px] p-6 bg-opacity-75">
        <CardBody className="flex flex-col items-center">
          <Image src={mail} alt="" className="mt-2" />

          <p className="text-black text-semibold text-2xl md:text-lg  mt-4 text-center mb-6">
            We sent a link to verify your email address to
            {userData?.email}. Please check your inbox or spam
          </p>

          <Link href={"/auth/login"} className="w-full">
            <Button size="lg" className="w-full mt-6 bg-[#008080]">
              <p className="text-white text-semibold">Login</p>
            </Button>
          </Link>

          <div className="flex justify-center mt-4 items-center">
            <p className="flex">
              Didn&apos;t receive the email?
              <Link href={""} className="ml-1 text-[#008080]">
                Resend it
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
