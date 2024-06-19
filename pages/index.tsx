"use client";
import Nav from "@/components/NavBar";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import doc from "../public/doc.png";
import slash from "../public/slash.svg";
import {
  Button,
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardHeader,
  Switch,
  Divider,
  Spacer,
} from "@nextui-org/react";
import arrowright from "../public/arrowright.svg";
import "../app/style.css";
import Link from "next/link";
import step1 from "../public/step1.svg";
import step2 from "../public/step2.svg";
import step3 from "../public/step3.svg";
import feat1 from "../public/feature1.svg";
import feat2 from "../public/feature2.svg";
import feat3 from "../public/feat3.svg";
import feat4 from "../public/feat4.svg";
import feat5 from "../public/feat5.svg";
import star from "../public/starr.svg";
import stars from "../public/yellowstar.svg";
import bgsec from "../public/bgsec.svg";
import ellipse from "../public/ellipse.svg";
import { motion, useScroll } from "framer-motion";
import check from "../public/check .svg";
import checkx from "../public/checkX.svg";
import Footer from "@/components/footer";
import flatArrow from "../public/flatarrow.svg";
import Testimonials from "@/components/Testimonials";
import {
  getJSONdata,
  getPlan,
  isPlusUser,
  userLoggedin,
} from "@/application/utils/functions";
import {
  startUserSubcription,
  updateUserSubcription,
} from "@/application/api/apis";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";

type Plan = "Enterprise Plan" | "Plus" | "Free" | "Pro";

interface Testimony {
  name: string;
  content: string;
  icon: string;
}

const testimonies: Testimony[] = [
  {
    name: "DR FRANK DUNE",
    content:
      "The technology is amazing to me! It does a good job of filtering out the idle chit chat and catching the important points of an exam. I would say it's saving me about 5-7 minutes per patient, which is HOURS of time saved over the course of a week!",
    icon: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  },
  {
    name: "DR, KATE STONE",
    content:
      "VetMemos has completely altered the way I manage patient records. With its assistance, charting is now a breeze, and I'm saving about 10 minutes per consultation. That adds up to a significant amount of extra time over a week. It’s a game-changer!",
    icon: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "DR. OLIVER WOODS",
    content:
      "As an avid user of VetMemos, I've seen a dramatic change in workflow efficiency. Its intuitive design captures all the nuanced details without fail, giving me back valuable time every single day. It's easily adding an extra hour to my day that I can dedicate to patient care. Brilliant tool!",
    icon: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

function Index() {
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrollin
  const [userData, setUserData] = useState<any>();
  const [isLoading, setLoader] = useState(false);
  const [isLogedin, setLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (userLoggedin()) {
      setLogin(true);
    }
  }, []);
  const toggleBillingCycle = () => {
    setIsYearlyBilling((prev) => !prev);
  };

  useEffect(() => {
    if (window) {
      setUserData(getJSONdata("profile"));
    }
  }, []);

  const subscribeUser = async () => {
    if (isLogedin == false) {
      router.push("auth/login");
      return;
    }
    if (isPlusUser(!isYearlyBilling) == false) {
      try {
        if (isPlusUser(false) && isPlusUser(true) == false) {
          setLoader(true);
          const sub = await updateUserSubcription("SUBSCRIPTION_UPDATE");
          setLoader(false);
          window.location.href = sub.url;

          return;
        }

        setLoader(true);
        const sub = await startUserSubcription(
          "PLUS",
          !isYearlyBilling ? "YEARLY" : "MONTHLY"
        );
        setLoader(false);
        window.location.href = sub.url;
        //console.log(sub);
      } catch (e) {
        setLoader(false);
        toast.error("an error has occured");
        console.log(e);
      }
    }
  };

  return (
    <div>
      <Nav />
      {/* Hero Section */}
      <section>
        <div className="flex flex-col lg:flex-row h-full  overflow-x-hidden">
          {/* Content */}
          <div className="flex-1 flex flex-col px-6 py-16 md:py-20 md:px-16 lg:px-32">
            <motion.h1
              variants={{
                hidden: { y: 60, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.7 }}
              viewport={{ once: false }}
              className="text-4xl lg:text-7xl font-normal mt-4 md:mt-10 mb-4"
            >
              Streamline Your Medical Documentation with{" "}
              <span className="text-[#007BFF]">MedMemo</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { y: 60, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.7 }}
              viewport={{ once: false }}
              className="text-lg lg:text-xl text-[#808080] mt-6"
            >
              It allows doctors to record, store, and access patient information
              efficiently and securely. We aim to reduce paperwork, enhance
              patient care.
            </motion.p>

            <motion.div
              variants={{
                hidden: { y: 60, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.7 }}
              viewport={{ once: false }}
              className="flex items-center gap-4 mt-20"
            >
              <Link href={"/auth/login"}>
                <Button radius="sm" className="bg-[#007BFF] px-8 py-6">
                  <h1 className="text-white font-semibold">Get Started</h1>
                </Button>
              </Link>
              <button className="font-semibold text-lg">
                <Link href={"/auth/login"}>Try Demo</Link>
              </button>
              <Image src={arrowright} alt="" />
            </motion.div>
          </div>

          {/* Background Image */}
          <motion.div
            variants={{
              hidden: { y: 60, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ ease: "linear", delay: 0.7 }}
            viewport={{ once: false }}
            className="flex-1 bg-cover bg-center relative mb-10 md:mb-0 md:mt-20"
          >
            <Image src={doc} alt="Background" width={600} height={600} />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="container mx-auto px-4 mt-24">
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              How it <span className="text-blue-500">Works</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              With MedMemos you can easily input patient details and medical
              history.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className=" p-6 rounded-lg shadow-lg w-full sm:w-64 md:w-1/4">
              <p className="text-gray-200 text-5xl font-bold mb-4">01</p>
              <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
              <p className="text-gray-600">
                Create your MedMemo account in minutes.
              </p>
            </div>

            <div className=" p-6 rounded-lg shadow-lg w-full sm:w-64 md:w-1/4">
              <p className="text-gray-200 text-5xl font-bold mb-4">02</p>
              <h2 className="text-2xl font-semibold mb-2">
                Record Information
              </h2>
              <p className="text-gray-600">
                Use the intuitive interface to document patient visits.
              </p>
            </div>

            <div className=" p-6 rounded-lg shadow-lg w-full sm:w-64 md:w-1/4">
              <p className="text-gray-200 text-5xl font-bold mb-4">03</p>
              <h2 className="text-2xl font-semibold mb-2">Store Securely</h2>
              <p className="text-gray-600">
                Keep all records safely stored and easily retrievable.
              </p>
            </div>

            <div className=" p-6 rounded-lg shadow-lg w-full sm:w-64 md:w-1/4">
              <p className="text-gray-200 text-5xl font-bold mb-4">04</p>
              <h2 className="text-2xl font-semibold mb-2">Access & Share</h2>
              <p className="text-gray-600">
                Access records from any device and share with others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Users Say About Us */}
      <section className="overflow-x-hidden">
        <div className="h-full bg-[#fff] justify-center items-center flex flex-col relative">
          <div className="flex flex-col items-center pt-14 mb-6">
            <h1 className="text-2xl sm:text-4xl mb-4 font-medium text-center">
              What Our Users Say About Us
            </h1>
            <p className="text-lg text-center">
              Rated 4.9/5 by our users worldwide.
            </p>
            <div className="mt-4">
              <Image src={stars} alt="" />
            </div>
          </div>
          <div className="py-10 md:py-20 px-4 max-w-[1280px] mx-auto">
            <div className="mx-auto max-w-xl md:max-w-none">
              <div className="flex flex-col  justify-center gap-2 md:gap-6 md:flex-row pb-7">
                {/* Testimonies mapping */}
                {testimonies.map((testimony, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { y: 60, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ ease: "linear", delay: 0.7 }}
                    viewport={{ once: false }}
                    className="w-full mb-6"
                  >
                    {/* Testimony Card */}
                    <Card className="bg-[#E5E5E6] sm:w-[500px] h-full">
                      <CardBody className=" p-4 h-full">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="justify-center items-center flex mr-2 rounded-full ">
                            <Avatar src={testimony.icon} />
                          </div>
                          {/* Testimony Content */}
                          <div className="text-start">
                            <p className="mb-1 font-medium">{testimony.name}</p>
                          </div>
                        </div>
                        <p className=" mt-4">{testimony.content}</p>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <motion.div
          variants={{
            hidden: { y: 60, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ ease: "linear", delay: 0.7 }}
          viewport={{ once: false }}
          className="px-4 md:px-10 lg:px-20 py-8 md:py-10 lg:py-32 w-full "
        >
          <Card className="bg-[#007BFF] w-full ">
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-center py-8 md:py-12 lg:py-16 px-6 md:px-10 lg:px-20">
                <div className="text-center md:text-left">
                  <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-regular max-w-xl md:max-w-lg lg:max-w-2xl">
                    Ready to save time on your consultations?
                  </h1>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl mt-4 max-w-xl md:max-w-lg lg:max-w-2xl">
                    Approximately 2 hours per day has been saved from automated
                    documentations
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Link href={"/auth/login"}>
                    <Button size="lg" className="bg-white">
                      <h1 className="font-medium">Try Demo</h1>
                      <Image src={arrowright} alt="" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Pricing */}
      <section id="Pricing" className="h-auto md:h-full">
        <div className=" relative flex flex-col justify-center items-center py-10 px-4 sm:px-0">
          <h1 className="text-black mb-10 text-4xl text-center font-semibold">
            Upgrade your plan
          </h1>
          <div className="flex mb-10">
            <h1
              className={`mr-4 ${
                isYearlyBilling ? "text-[#E67E22]" : "text-[#ccc]"
              }`}
            >
              Billed Monthly
            </h1>
            <Switch
              className="mr-4"
              checked={isYearlyBilling}
              onChange={toggleBillingCycle}
              color="warning"
            />
            <h1
              className={`mr-4 ${
                isYearlyBilling ? "text-[#ccc]" : "text-[#E67E22]"
              }`}
            >
              Billed Yearly
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <motion.div
              layout
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Card className="w-full md:w-[440px] h-full p-8 bg-transparent border border-[#007BFF] mb-4">
                <h3 className="mb-4 font-semibold text-2xl">Free</h3>
                <h1 className="text-black text-4xl mb-10 font-regular">$0</h1>

                <p className="text-sm mb-4 text-gray-400">
                  Perfect for individuals or Companies looking to try things
                  out.
                </p>

                <Button
                  variant="bordered"
                  className="border-[#007BFF] py-6 border-1 mb-6"
                >
                  <p className="text-[#007BFF] text-lg font-light">
                    {getPlan(userData?.roles || []) === "Free"
                      ? "Active"
                      : "Get Started"}
                  </p>
                </Button>

                <Divider className="mb-4" />

                <h3 className="font-semibold mb-4">Features:</h3>

                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">5 sessions</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">1 account</p>
                </div>
                <div className="flex mb-4">
                  <Image src={checkx} alt="x" className="mr-4" />
                  <p className="text-black">Custom templates</p>
                </div>
                <div className="flex mb-4">
                  <Image src={checkx} alt="x" className="mr-4" />
                  <p className="text-black">Email support</p>
                </div>
              </Card>
            </motion.div>
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Card className="w-full h-full md:w-[440px] bg-transparent p-8 border border-[#007BFF] mb-4">
                <h3 className="mb-4 font-semibold text-2xl">Plus</h3>
                <h1 className="text-black text-4xl mb-2 font-regular">
                  {isYearlyBilling ? "$99.99" : "$999.99"}
                </h1>
                <p className="mb-4 text-sm text-gray-400">
                  {" "}
                  {isYearlyBilling ? "Per month" : "Per year"}
                </p>

                <p className="text-sm mb-4 text-gray-400">
                  Perfect for individuals or Companies looking to try things
                  out.
                </p>

                <Button
                  variant="bordered"
                  className="border-[#007BFF] py-6 border-1 mb-6"
                  // onClick={() => {
                  //   subscribeUser();
                  // }}
                >
                  <p className="text-[#007BFF] text-lg font-light">
                    {getPlan(userData?.roles || []) === "Plus"
                      ? "Active"
                      : "Get Started"}
                  </p>
                </Button>

                <Divider className="mb-4" />

                <h3 className="font-semibold mb-4">Features:</h3>

                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Unlimited sessions</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Unlimited accounts</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Unlimited templates</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Dedicated support</p>
                </div>
              </Card>
            </motion.div>
          </div>
          <br />
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Card className="w-full h-full md:w-[440px] bg-transparent p-8 border border-[#007BFF] mb-4">
                <h3 className="mb-4 font-semibold text-2xl">Enterprise</h3>
                <h1 className="text-black text-4xl mb-2 font-regular">
                  {isYearlyBilling ? "Custom" : "Custom"}
                </h1>
                <p className="mb-4 text-sm text-gray-400">
                  {" "}
                  {isYearlyBilling ? "Per month" : "Per year"}
                </p>

                <p className="text-sm mb-4 text-gray-400">
                  Perfect for clinics or groups with multiple providers.
                </p>

                <Button
                  variant="bordered"
                  className="border-[#007BFF] py-6 border-1 mb-6"
                  // onClick={() => {
                  //   //subscribeUser();
                  //   window.location.href = "mailto:info@vetmemos.com";
                  // }}
                >
                  <p className="text-[#007BFF] text-lg font-light">
                    {getPlan(userData?.roles || []) === "Enterprise"
                      ? "Active"
                      : "Contact Us"}
                  </p>
                </Button>

                <Divider className="mb-4" />

                <h3 className="font-semibold mb-4">Features:</h3>

                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">All Plus Plan Features</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Unlimited Consultations</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">
                    Custom Integrations & Automations
                  </p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Tailord Machine Learning Models</p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">Dedicated Customer Support</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Index;
