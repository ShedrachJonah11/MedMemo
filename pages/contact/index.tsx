import Nav from "@/components/NavBar";
import Footer from "@/components/footer";
import { Button, Card, CardBody, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import arrowright from "../../public/arrow-right.svg";
import mail from "../../public/omail.svg";
import phone from "../../public/phone.svg";
import side from "../../public/side.svg";

function index() {
  return (
    <div className="bg-[#FAF9F6]">
      <Nav />
      <div>
        {/* Main section */}
        <div className="h-full flex flex-col items-center bg-[#008080]">
          <h1 className="text-white text-5xl font-bold mt-10">Contact Us</h1>
          <p className="mt-4 mb-6 text-center text-white font-light text-xl">
            Not sure what you need? The team at VetMemos will be happy to listen
            to you and give suggestions to help you.
          </p>
          <div className="flex items-center p-2 gap-2 md:gap-6 mb-6">
            <Image src={mail} alt="" />
            <p className="text-white text-sm md:text">Info@VetMemos.com</p>
          </div>
          {/* Container */}
          <div>
            <Card className="w-96 h-[850px] md:h-[700px] md:w-[900px] mb-10">
              <CardBody className="md:p-10 p-6 ">
                <Image src={side} alt="" className="absolute right-0 top-0" />
                <h1 className="md:text-4xl text-lg mb-2 ">
                  We&apos;d love to hear from you!
                </h1>
                <p className="text-gray-400 text-lg mb-4 ">
                  Let&apos;s get in touch
                </p>

                <div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-4">
                    <div className="w-full">
                      <h1 className="mb-2 font-bold">Full name</h1>
                      <Input variant="bordered" />
                    </div>
                    <div className="w-full">
                      <h1 className="mb-2 font-bold">Company</h1>
                      <Input variant="bordered" />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-4">
                    <div className="w-full">
                      <h1 className="mb-2 font-bold">E-mail</h1>
                      <Input variant="bordered" />
                    </div>
                    <div className="w-full">
                      <h1 className="mb-2 font-bold">Phone number</h1>
                      <Input variant="bordered" />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-4">
                    <div className="w-full">
                      <h1 className="mb-2 font-bold">Address</h1>
                      <Input variant="bordered" />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-4">
                    <div className="w-full">
                      <h1 className="mb-2 font-bold">Your message</h1>
                      <Textarea
                        variant="bordered"
                        classNames={{
                          input: "resize-y min-h-[40px]",
                        }}
                      />
                    </div>
                  </div>

                  <Button className="text-white mt-6 bg-[#008080]">
                    Send Message
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* botton section */}
        <div className="px-4  md:px-10 lg:px-20 py-8 md:py-10 lg:py-32 ">
          <Card className="bg-white w-full">
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-center py-8 md:py-12 lg:py-16 px-6 md:px-10 lg:px-20">
                <div className="text-center md:text-left">
                  <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-regular max-w-xl md:max-w-lg lg:max-w-2xl">
                    Ready to save time on your consultations?
                  </h1>
                  <p className="text-black font-light text-base md:text-lg lg:text-xl mt-4 max-w-xl md:max-w-lg lg:max-w-2xl">
                    Approximately 2 hours per day has been saved from automated
                    documentations
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Button size="lg" className="bg-[#008080]">
                    <h1 className="font-medium text-white">Try Demo</h1>
                    <Image src={arrowright} alt="" />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default index;
