"use client";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Bullet } from "../../../components/bullet";

const Profile = () => {
  const [activeNav, setActiveNav] = useState("1");

  return (
    <div className="flex justify-start items-center w-full">
      <div className="w-[35%] bg-white p-8 rounded-[16px]">
        <div className="mb-[32px] flex justify-start items-center">
          <p
            onClick={() => setActiveNav("1")}
            className={`${
              activeNav === "1"
                ? " text-[#004085] bg-[#E6F2FF] border-[2px] border-primary"
                : "backdrop-blur mx-2 text-[#343A40]"
            } px-4 transition-all ease-out duration-200  hover:scale-95 text-[16px] font-[500] cursor-pointer text-center py-[8px] rounded-[4px]`}
          >
            Account settings
          </p>
          <p
            onClick={() => setActiveNav("2")}
            className={`${
              activeNav === "2"
                ? " text-[#004085] bg-[#E6F2FF] border-[2px] border-primary"
                : "backdrop-blur mx-2 text-[#343A40]"
            } px-4 transition-all ease-out duration-200  hover:scale-95 text-[16px] font-[500] cursor-pointer text-center py-[8px] rounded-[4px]`}
          >
            Preferences
          </p>
        </div>

        {activeNav === "1" && (
          <div>
            <div className="mb-[24px]">
              <fieldset>
                <label
                  htmlFor=""
                  className=" text-[#343A40] text-[16px] font-[500]"
                >
                  Personal Details
                </label>
                <div className="w-full border-[#83818E] border-[2px] outline-none rounded-[4px] px-[16px] flex flex-col items-start gap-0 py-[8px] mt-2">
                  <p className="text-[#71839B] text-[12px] font-[500] leading-0">
                    Name
                  </p>
                  <p className="text-[#343A40] text-[14px] font-[600] leading-0">
                    John Doe
                  </p>
                </div>
              </fieldset>
            </div>
            <div className="mb-[24px]">
              <fieldset>
                <label
                  htmlFor=""
                  className=" text-[#343A40] text-[16px] font-[500]"
                >
                  Plan
                </label>
                <div className="flex mt-2 mb-4 justify-center items-center bg-[#004085] rounded-full text-white text-[14px] font-[600] px-5 py-2 w-fit">
                  <p>Free plan</p>
                </div>
                <div className="flex justify-start items-center gap-1 mb-4">
                  <InfoCircle size="16" color="#71839B" />
                  <p className="text-[#71839B] text-[14px]">
                    Limited to 10 conversations a month
                  </p>
                </div>
                <button className="w-full h-[52px] bg-[#007BFF] rounded-[8px] text-white font-[600]">
                  Upgrade for ₦100,000/month
                </button>
                <p className="text-center py-2 text-[#71839B] text-[12px]">
                  Or
                </p>
                <Link
                  href="/"
                  className="text-[#007BFF] text-[16px] text-center font-[600] w-full flex justify-center items-center"
                >
                  View our Pricing
                </Link>
              </fieldset>
            </div>
            <div className="">
              <fieldset>
                <label
                  htmlFor=""
                  className=" text-[#343A40] text-[16px] font-[500]"
                >
                  Personal Details
                </label>
                <div className="flex justify-start items-center gap-1 mb-4">
                  <InfoCircle size="16" color="#71839B" />
                  <p className="text-[#71839B] text-[14px]">
                    This information will appear in letters and patient notes.{" "}
                  </p>
                </div>
                <div className="w-full border-[#83818E] border-[2px] outline-none rounded-[4px] px-[16px] h-[190px] flex flex-col items-start gap-0 py-[8px] mt-2">
                  <p className="text-[#71839B] text-[14px] font-[600] leading-0">
                    John Doe
                  </p>
                  <p className="text-[#71839B] text-[14px] font-[600] leading-0">
                    no2 vom street{" "}
                  </p>
                  <p className="text-[#71839B] text-[14px] font-[600] leading-0 mt-4">
                    Katako{" "}
                  </p>
                </div>
              </fieldset>
            </div>
          </div>
        )}

        {activeNav === "2" && (
          <div>
            <div className="rounded-2xl flex flex-col gap-2 bg-white">
              <Select
                size="md"
                radius="md"
                className="w-full bg-white shadow-none border-1 rounded-lg h-[60px]"
                label="Templates"
                labelPlacement="inside"
                variant="flat"
                aria-label="Templates"
                classNames={{
                  trigger: [
                    "bg-white",
                    "data-focus-[within=true]:bg-white",
                    "data-[hover=true]:bg-white",
                    "group-data-[focus=true]:bg-white",
                  ],
                  label: "pl-10",
                }}
                startContent={<Bullet color="#004085" />}
                defaultSelectedKeys={["SOAP"]}
              >
                <SelectItem key={"SOAP"}>SOAP</SelectItem>
              </Select>
              <Select
                size="md"
                radius="md"
                className="w-full bg-white shadow-none border-1 rounded-lg h-[60px]"
                label="Style"
                variant="flat"
                labelPlacement="inside"
                aria-label="Style"
                classNames={{
                  trigger: [
                    "bg-white",
                    "data-focus-[within=true]:bg-white",
                    "data-[hover=true]:bg-white",
                    "group-data-[focus=true]:bg-white",
                  ],
                  label: "pl-10",
                }}
                startContent={<Bullet color="#5BC0DE" />}
                defaultSelectedKeys={["Bullet points"]}
              >
                <SelectItem key={"Bullet points"}>Bullet points</SelectItem>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
