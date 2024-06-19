import React, { useState } from "react";
import bg from "../../../public/bgauth.svg";
import star from "../../../public/star.svg";
import Image from "next/image";
import { Button, Card, CardBody, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { EyeFilledIcon } from "../../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../public/EyeSlashFilledIcon";
import { loginAccount, loginGoogle } from "@/application/api/apis";
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
  const [error, setError] = useState<string | null>(null);

  const loginG = async () => {
    try {
      setLoading(true);
      const res = await loginGoogle();
      setLoading(false);
      if (window) {
        window.location.href = res.authorization_url;
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      setError("Failed to login with Google");
    }
  };

  const login = async () => {
    if (userData) {
      if (!userData.username.trim()) {
        toast.error("Please enter your email.");
        return;
      }
      if (userData.username.trim().length<2) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!userData.password.trim()) {
        toast.error("Please enter your password.");
        return;
      }
      try {
        setLoading(true);
        const res = await loginAccount(userData);
        setLoading(false);
        //console.log(res);
        //signed up successfully
        router.push("/dashboard");
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        if (error.response && error.response.data) {
          const { data } = error.response;

          if (data.detail === "LOGIN_BAD_CREDENTIALS") {
            // Handle invalid password error
            setError("Incorrect email/password");
          } else if(data.detail==="LOGIN_USER_NOT_VERIFIED") {
            // Handle other error scenarios
            setError("Email not verified");
          }else{
            setError("Unknown Error");
          }
        } else {
          // Handle other types of errors
          setError("Incorrect email/password");
        }
      }
    }
  };

  const isLoginButtonDisabled =
    !userData.username.trim() || !userData.password.trim();
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative loginBg h-screen flex items-center justify-center overflow-hidden">
      {/* <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority={true}
      /> */}
      <Card className="w-96 sm:w-[450px]  p-6 bg-opacity-75">
        <CardBody className="flex flex-col items-center">
          <Image src={star} alt="" className="mt-2 mb-2" />

          <h1 className="text-lg font-bold mb-2">Log in your account</h1>
          <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details.
          </p>

          {error && <p className="text-red-500 font-medium mb-2">{error}</p>}

          <Input
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e: any) => {
              setUserData({ ...userData, username: e.target.value });
            }}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            variant="bordered"
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
            onChange={(e: any) => {
              setUserData({ ...userData, password: e.target.value });
              setPasswordLengthValid(
                e.target.value.length >= 6 && e.target.value.length <= 36
              );
            }}
          />
          {!passwordLengthValid && (
            <p className="text-red-500 text-xs font-medium mt-1">
              Password should be between 6 to 36 characters
            </p>
          )}

          <Button
            size="lg"
            className="w-full mt-6 "
            onClick={login}
            disabled={isLoginButtonDisabled}
            style={{
              backgroundColor: isLoginButtonDisabled ? "#CCCCCC" : "#007BFF",
            }}
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
                className="text-[#008080] text-xs md:text-sm"
              >
                Forgot password
              </Link>
            </div>
          </div>

          <div className="flex items-center mt-6 mb-4">
            <div className="flex-1 border-t border-black"></div>
            <div className="flex-1 border-t border-black"></div>
          </div>

          {/* <Button size="lg" className="w-full bg-white mb-4" onClick={loginG}>
            <Image src={goggle} alt="google" />
            <p>Login with Google</p>
          </Button> */}
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
      {isLoading && <Loader type={"FULL"} />}
    </div>
  );
}

export default Index;
