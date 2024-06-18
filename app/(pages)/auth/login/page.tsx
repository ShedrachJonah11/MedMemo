import React from "react";
import bg from "@/public/bgauth2.png";
import star from "@/public/star.svg";
import Image from "next/image";
import { Button, Card, CardBody, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { EyeFilledIcon } from "@/public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/public/EyeSlashFilledIcon";
import goggle from "@/public/goggle.svg";

function Index() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <Card className="w-96 sm:w-[450px]  p-6 bg-opacity-75">
        <CardBody className="flex flex-col items-center">
          <Image src={star} alt="" className="mt-2 mb-2" />

          <h1 className="text-lg font-bold mb-2">Log in your account</h1>
          <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details.
          </p>

          <Input
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            variant="bordered"
            endContent={
              <button type="button">
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              </button>
            }
            type="password"
            className="mt-4"
          />

          <Button
            size="lg"
            className="w-full mt-6 "
            style={{ backgroundColor: "#008080" }}
          >
            <p className="text-white text-semibold ">Login</p>
          </Button>

          <div className="flex justify-between items-center gap-12 mt-2">
            <div className="flex items-center">
              <Checkbox defaultSelected />
              <p className="ml-2 text-xs md:text-sm">Remember for 30 days</p>
            </div>
            <div>
              <Link
                href={"/auth/forgotpassword"}
                className="text-[#007BFF] text-xs md:text-sm"
              >
                Forgot password
              </Link>
            </div>
          </div>

          <div className="flex items-center mt-6 mb-4">
            <div className="flex-1 border-t border-black"></div>
            <p className="mx-4">or</p>
            <div className="flex-1 border-t border-black"></div>
          </div>

          <Button size="lg" className="w-full bg-white mb-4">
            <Image src={goggle} alt="google" />
            <p>Login with Google</p>
          </Button>
          <div className="flex justify-center items-center">
            <p className="flex">
              Don&apos;t have an account already?
              <Link href={"/auth/signup"} className="ml-1 text-[#008080]">
                Signup
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;
