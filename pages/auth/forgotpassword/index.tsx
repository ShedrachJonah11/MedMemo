import React, { useState } from "react";
import bg from "../../../public/bgauth.svg";
import lock from "../../../public/lock.svg";
import Image from "next/image";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import arrowback from "../../../public/menu2.svg";
import { forgotPassword } from "@/application/api/apis";
import Loader from "@/components/Loader";
import router from "next/router";

function Index() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const resetPass = async () => {
    if (email.length < 1) {
      //show error
    }
    try {
      setLoading(true);
      const data = await forgotPassword(email);
      setLoading(false);
      console.log(data);
      router.push("/auth/reset-password");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <div className="relative signupBg h-screen flex items-center justify-center overflow-hidden">
      {/* <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority={true}
      /> */}
      <Card className="w-96 sm:w-[450px]  p-6 bg-opacity-75 ">
        <CardBody className="flex flex-col items-center">
          <Image src={lock} alt="" className="mt-2" />

          <h1 className="text-lg font-bold mb-2">Account recovery</h1>
          <p className="text-gray-500 mb-6">
            Enter your email address to reset your password
          </p>

          <Input
            type="email"
            variant="bordered"
            label="Enter your email"
            className=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="flex w-full gap-4">
            <Link href="/auth/login" className="w-full">
              <Button variant="bordered" size="lg" className="w-full mt-6 ">
                <p className="text-black text-semibold ">Cancel</p>
              </Button>
            </Link>

            <Button
              size="lg"
              className="w-full mt-6 bg-[#007BFF]"
              onClick={() => {
                resetPass();
              }}
            >
              <p className="text-white text-semibold ">Next</p>
            </Button>
          </div>
        </CardBody>
      </Card>
      {isLoading && <Loader type={"FULL"} />}
    </div>
  );
}

export default Index;
