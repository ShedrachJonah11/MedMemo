import React from "react";
import bg from "@/public/bgauth.png";
import star from "@/public/star.svg";
import Image from "next/image";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import { EyeFilledIcon } from "@/public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/public/EyeSlashFilledIcon";
import goggle from "@/public/goggle.svg";

function Index() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute right-0 h-full w-full">
        <Image
          src={bg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <Card className="w-96 sm:w-[450px] p-6 bg-opacity-75">
        <CardBody className="flex flex-col items-center">
          <Image src={star} alt="" className="mt-2" />

          <h1 className="text-lg font-bold mb-2">Sign up</h1>
          <p className="text-gray-500 mb-2">Start your 3-day free trial.</p>

          <Input
            type="name"
            label="First Name"
            placeholder="Enter your first name"
            className="mb-4"
            variant="bordered"
          />
          <Input
            type="name"
            label="Last Name"
            placeholder="Enter your last name"
            variant="bordered"
            className="mb-4"
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            name="password"
            label="Password"
            placeholder="Create a password"
            variant="bordered"
            endContent={
              <button type="button" className="cursor-pointer">
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              </button>
            }
            type="password"
            className="mt-4"
          />

          <Button
            radius="sm"
            className="w-full mt-6 py-4 text-white text-semibold"
            style={{ backgroundColor: "#007BFF" }}
          >
            Sign Up
          </Button>

          <div className="flex items-center mt-6 mb-4">
            <div className="flex-1 border-t border-black"></div>
            <p className="mx-4">or</p>
            <div className="flex-1 border-t border-black"></div>
          </div>

          <Button className="w-full py-4 bg-white mb-4 flex items-center justify-center">
            <Image src={goggle} alt="google" />
            <p>Sign up with Google</p>
          </Button>
          <div className="flex justify-center items-center">
            <p className="flex">
              Have an account already?
              <Link href={"/auth/login"} className="ml-1 text-[#008080]">
                login
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;
