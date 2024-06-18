"use client";
import React, { useEffect, useState } from "react";
import bg from "../../../public/bgauth.svg";
import sheild from "../../../public/sheild.svg";
import Image from "next/image";
import { Button, Card, CardBody, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { EyeFilledIcon } from "../../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../public/EyeSlashFilledIcon";
import {
  loginAccount,
  loginGoogle,
  resetPassword,
} from "@/application/api/apis";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import goggle from "../../../public/goggle.svg";
import arrowback from "../../../public/menu2.svg";
import { toast } from "react-toastify";

function Index() {
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);
  const [userData, setUserData] = useState<any>({
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const loginG = async () => {};
  const login = async () => {};
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");

  const { query } = router;

  useEffect(() => {}, [query.token]);

  const resetPass = async () => {
    if (pass.length < 5) {
      //show error
      toast.error("password must be greater than 5 charactors");
    }
    if (pass !== pass1) {
      //show error
      toast.error("password don't match");
    }
    try {
      setLoading(true);
      const data = await resetPassword(query.token, pass);
      setLoading(false);
      console.log(data);
      //redirect user to password changed successfully page
    } catch (e) {
      console.log(e);
      setLoading(false);
      //show invalid token here
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <Card className="w-96 sm:w-[450px]  p-6 bg-opacity-75">
        <CardBody className="flex flex-col items-center">
          <Image src={sheild} alt="" className="mt-2" />

          <h1 className="text-lg font-bold mb-2">Create a new password</h1>
          <p className="text-gray-500 mb-6">
            Enter your new password to make this change.
          </p>

          <Input
            label="New Password"
            placeholder=""
            variant="bordered"
            value={pass1}
            onChange={(e) => {
              setPass1(e.target.value);
            }}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="mt-4"
          />
          <Input
            label="Confirm Password"
            placeholder=""
            variant="bordered"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="mt-4"
          />

          <div className="flex w-full gap-4">
            <Button
              size="lg"
              variant="bordered"
              className="w-full mt-6 "
              onClick={() => {
                login();
              }}
            >
              <p className="text-black text-semibold ">Cancel</p>
            </Button>
            <Button
              size="lg"
              className="w-full mt-6 bg-[#008080]"
              onClick={() => {
                resetPass();
              }}
            >
              <p className="text-white text-semibold ">Confirm</p>
            </Button>
          </div>
        </CardBody>
      </Card>
      {isLoading && <Loader type={"FULL"} />}
    </div>
  );
}

export default Index;
