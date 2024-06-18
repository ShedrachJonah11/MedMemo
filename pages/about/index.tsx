import Image from "next/image";
import React from "react";
import bg from "../../public/Content.png";
import Nav from "@/components/NavBar";
import { Button, Card, CardBody } from "@nextui-org/react";
import Footer from "@/components/footer";
import dog from "../../public/dog.png";
import icon from "../../public/Icon Label.svg";
import icon2 from "../../public/Icon Label2.svg";
import friend from "../../public/hand.svg";
import sheild from "../../public/sheild2.svg";
import person from "../../public/person.svg";
import Link from "next/link";
import arrowright from "../../public/arrow-right.svg";

function Index() {
  return (
    <div className="bg-[#FAF9F6]">
      <Nav />
      {/* Hero seciton */}
      <div className="h-[500px] mb-20 px-6 md:px-32 py-14 md:py-32 bg-[#008080]">
        <div className="mb-6">
          <h1 className="text-white text-3xl md:text-6xl">
            What is VetMemos and
          </h1>
          <h1 className="text-white  text-3xl md:text-6xl">how valid is it?</h1>
        </div>
        <p className="text-gray-300 text-base md:text-lg font leading-8 w-96 md:w-[700px]">
          Welcome to VetMemos, a pioneering platform that redefines healthcare
          documentation for individuals and organizations. Our AI-powered
          solution streamlines the management of pet complaints, saving time and
          enhancing precision.
        </p>
        <div className="flex items-center gap-4 mt-10">
          <Button className="bg-white  px-8 py-6">
            <Link href={"/auth/login"}>
              <h1 className=" font-semibold">Get Started</h1>
            </Link>
          </Button>
          <Link href={"/auth/login"}>
            <button className="font-semibold text-white">Try Demo</button>
          </Link>
          <Image src={arrowright} alt="" />
        </div>
      </div>

      {/* About section */}
      <div className="mb-24">
        <div className="bg-white flex flex-col md:flex-row px-6 md:px-32 justify-center items-center gap-6 md:gap-20">
          <Image src={dog} alt="" width={500} height={500} />
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={icon} alt="" />
              <h4 className="font-light text-lg">About Us</h4>
            </div>
            <h1 className="font-semibold text-4xl mb-4 text-center md:text-left">
              Our Company Overview
            </h1>
            <p className="leading-8 text-gray-400 text-center md:text-left">
              Discover our cutting-edge platform, streamlining pet documentation
              for vets. Our AI ensures accurate analysis, translating
              conversations into insightful records effortlessly. The intuitive
              interface integrates seamlessly into daily workflows, saving time
              for optimal pet care. Tailored for individual practitioners and
              clinics, our platform becomes a trusted partner in navigating pet
              health records. Join us in shaping the future of veterinary care
              with a toolset designed for precision and efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="h-full flex flex-col justify-center items-center mb-20 ">
        <div className="flex gap-2 items-center mb-4">
          <Image src={icon2} alt="" />
          <h5 className="font-light text-gray-400">VetMemos Features</h5>
        </div>
        <h1 className="text-5xl text-center font-medium mb-16 md:w-[700px]">
          The Features of <span className="font-extralight">VetMemos</span> that
          you will benefit from
        </h1>

        <Link href={"/auth/login"}>
          <Button size="lg" className="text-white px-10 bg-[#008080] mb-10">
            Get Started
          </Button>
        </Link>

        <div className="flex flex-wrap justify-center mt-6 gap-4 md:gap-14">
          <Card className="border border-[#008080] bg-transparent w-64 h-80 md:w-72 md:h-96">
            <CardBody className="flex flex-col items-center justify-center">
              <Image src={friend} alt="" />
              <h3 className="text-center mt-6 text-3xl font-light ">
                User Friendly Interface
              </h3>
            </CardBody>
          </Card>
          <Card className="border border-[#008080] bg-transparent w-64 h-80 md:w-72 md:h-96">
            <CardBody className="flex flex-col items-center justify-center">
              <Image src={sheild} alt="" />
              <h3 className="text-center mt-6 text-3xl font-light">
                Secure Data Handling
              </h3>
            </CardBody>
          </Card>
          <Card className="border border-[#008080] bg-transparent w-64 h-80 md:w-72 md:h-96">
            <CardBody className="flex flex-col items-center justify-center">
              <Image src={person} alt="" />
              <h3 className="text-center mt-6 text-3xl font-light">
                Accessible To All Users
              </h3>
            </CardBody>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Index;
