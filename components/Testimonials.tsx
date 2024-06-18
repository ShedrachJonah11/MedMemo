import React, { useRef, useState } from "react";
import { Card, CardHeader, Button, Avatar } from "@nextui-org/react";
import Image from "next/image";
import stars from "../public/yellowstar.svg";
import ellipse from "../public/ellipse.svg";
import flatArrow from "../public/flatArrow.svg";

function Testimonials() {
  return (
    <section>
      <div className="h-full bg-[#FAF9F6] justify-center items-center flex flex-col relative">
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

        {/* Testimonies */}
        <div className="relative flex flex-col gap-4 md:flex-row md:gap-9 mb-4 overflow-hidden">
          <Image
            src={ellipse}
            alt="bg"
            className="z-10 absolute hidden md:block w-[600px]"
          />
          <div
            className="flex gap-4 md:gap-9 px-4 md:px-0 overflow-x-auto md:overflow-hidden"
            style={{ width: "calc(80 * 4 + 8 * 3)px" }}
          >
            <Card className="w-80">
              <CardHeader className="flex gap-3">
                <div className="p-2">
                  <div className="flex items-center mb-6">
                    <div className="justify-center items-center flex  mr-2 rounded-full">
                      <Avatar />
                    </div>
                    <div className="text-start ">
                      <p className="mb-1 font-medium">Shedrach Jonah</p>
                      <p className="font-light text-sm">CEO</p>
                    </div>
                  </div>
                  <p>
                    As a healthcare solutions provider, we constantly seek tools
                    that enhance our services. This platform has become an
                    indispensable asset, offering a powerful blend of AI
                    technology and user-friendly design. It&apos;s a win-win for
                    both our clients and us.
                  </p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="flex gap-8">
          <Button
            isIconOnly
            className={`bg-[#F74D4D] bg-opacity-40  p-5 rounded-full ${
              scrollX === 0 && "filter grayscale"
            }`}
            disabled={scrollX === 0}
            startContent={
              <Image
                alt="arrow"
                className="w-[120px] max-w-[unset] rotate-180"
                src={flatArrow}
                width={100}
              ></Image>
            }
          ></Button>
          <Button
            isIconOnly
            className={`bg-[#F74D4D] bg-opacity-40 p-5 rounded-full`}
            startContent={
              <Image
                alt="arrow"
                className="relative z-50 w-8 max-w-[unset]"
                src={flatArrow}
                width={100}
              ></Image>
            }
          ></Button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
