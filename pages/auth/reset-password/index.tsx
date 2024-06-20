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

export default function Verify() {
  const router = useRouter();
  const { query } = router;

  const [userData, setUserData] = useState<any>();

  const [isVeridfied, setVerifed] = useState(false);
  const getData = async () => {
    try {
      const token = query.token;

      if (token) {
        console.log(token);
        await verifyAccount(token);
        setVerifed(true);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    getData();
  }, [query.token]);

  return (
    <div className="relative signupBg h-screen flex items-center justify-center overflow-hidden">
      {/* <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority={true}
      /> */}
      <Card className="w-96 sm:w-[450px] p-6 bg-opacity-75">
        <CardBody className="flex flex-col items-center">
          <Image src={mail} alt="" className="mt-2" />

          <h1 className="mt-4 font-medium text-xl md:text-2xl">
            E-mail sent successfully
          </h1>

          <p className="text-black text-semibold text-sm md:text-sm mt-4 text-center mb-6">
            An e-mail has been sent with instructions to reset your password
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
