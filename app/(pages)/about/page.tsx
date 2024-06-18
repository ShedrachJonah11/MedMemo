import Image from "next/image";
import React from "react";
// import Nav from "@/components/NavBar";
import { Button, Card, CardBody } from "@nextui-org/react";
// import Footer from "@/components/footer";
import group from "@/public/group-doc.svg";
import icon from "@/public/Icon Label.svg";
import icon2 from "@/public/Icon Label2.svg";
import friend from "@/public/hand.svg";
import sheild from "@/public/sheild2.svg";
import person from "@/public/person.svg";
import Link from "next/link";
import arrowright from "@/public/arrow-right.svg";
import bg from "@/public/bg.png";

function Index() {
  return (
    <div className="bg-[#FAF9F6]">
      {/* <Nav /> */}
      {/* Hero seciton */}
      <div className="relative h-auto md:h-[500px] mb-20 px-6 md:px-32 py-14 md:py-32">
        <Image
          src={bg}
          alt="bg"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        {/* Optional overlay for better readability */}
        {/* <div className="absolute inset-0 bg-black opacity-50 z-10"></div> */}
        <div className="relative z-20 flex flex-col justify-center h-full">
          <div className="mb-6">
            <h1 className="text-white font-medium text-3xl md:text-6xl leading-tight md:leading-none">
              What is MedMemos and
            </h1>
            <h1 className="text-white font-medium text-3xl md:text-6xl leading-tight md:leading-none">
              How valid is it?
            </h1>
          </div>
          <p className="text-gray-300 text-base md:text-lg font-extralight leading-8 md:w-full">
            MedMemos is a comprehensive medical documentation tool designed to
            streamline the workflow of healthcare professionals by facilitating
            patient registration, recording consultations, and providing
            accurate transcriptions. It integrates seamlessly with existing
            medical systems, ensuring secure and efficient data management.
            MedMemos enhances patient care by allowing easy access to detailed
            patient records and customizable documentation templates tailored to
            the needs of medical practices.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-10">
            <Link href={"/auth/login"}>
              <button className="font-semibold text-white bg-transparent hover:bg-white hover:text-blue-500 px-4 py-2 transition-colors duration-300">
                Try Demo
              </button>
            </Link>
            <Image
              src={arrowright}
              alt="arrow right"
              className="hidden md:block"
            />
            <Link href={"/auth/login"}>
              <Button
                radius="sm"
                className="font-semibold text-blue-500 bg-white hover:bg-blue-500 hover:text-white px-8 py-2 transition-colors duration-300"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="mb-24">
        <div className="bg-white flex flex-col md:flex-row px-6 md:px-32 justify-center items-center gap-6 md:gap-20">
          <Image src={group} alt="" width={500} height={500} />
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={icon} alt="" />
              <h4 className="font-light text-lg">About Us</h4>
            </div>
            <h1 className="font-semibold text-4xl mb-4 text-center md:text-left">
              Our Company Overview
            </h1>
            <p className="leading-8 text-gray-400 text-center md:text-left">
              Discover our cutting-edge platform, streamlining medical
              documentation for doctors. Our AI ensures accurate analysis,
              translating conversations into insightful records effortlessly.
              The intuitive interface integrates seamlessly into daily
              workflows, saving time for optimal patient care. Tailored for
              individual practitioners and clinics, our platform becomes a
              trusted partner in navigating health records. Join us in shaping
              the future of medicine with a toolset designed for precision and
              efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="h-full flex flex-col justify-center items-center mb-20 ">
        <div className="flex gap-2 items-center mb-4">
          <Image src={icon2} alt="" />
          <h5 className="font-light text-gray-400">MedMemos Features</h5>
        </div>
        <h1 className="text-5xl text-center font-medium mb-16 md:w-[700px]">
          The Features of medMemos that you will benefit from
        </h1>

        <Link href={"/auth/login"}>
          <Button
            size="lg"
            radius="sm"
            className="text-white px-10 bg-[#007BFF] mb-10"
          >
            Get Started
          </Button>
        </Link>

        <div className="flex flex-wrap justify-center mt-6 gap-4 md:gap-14">
          <Card className="border border-[#007BFF] bg-transparent w-64 h-80 md:w-72 md:h-96">
            <CardBody className="flex flex-col items-center justify-center">
              <Image src={friend} alt="" />
              <h3 className="text-center mt-6 text-3xl font-light ">
                User Friendly Interface
              </h3>
            </CardBody>
          </Card>
          <Card className="border border-[#007BFF] bg-transparent w-64 h-80 md:w-72 md:h-96">
            <CardBody className="flex flex-col items-center justify-center">
              <Image src={sheild} alt="" />
              <h3 className="text-center mt-6 text-3xl font-light">
                Secure Data Handling
              </h3>
            </CardBody>
          </Card>
          <Card className="border border-[#007BFF] bg-transparent w-64 h-80 md:w-72 md:h-96">
            <CardBody className="flex flex-col items-center justify-center">
              <Image src={person} alt="" />
              <h3 className="text-center mt-6 text-3xl font-light">
                Accessible To All Users
              </h3>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Index;
