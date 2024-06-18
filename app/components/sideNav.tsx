"use client";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Spacer
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocumentUpload, Microphone, People, Refresh2 } from "iconsax-react";

export default function Nav() {
  const [showOnlyIcon, setShowOnlyIcon] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    localStorage.setItem("showOnlyIcon", JSON.stringify(showOnlyIcon));
  }, [showOnlyIcon]);

  useEffect(() => {
    const storedShowOnlyIcon = localStorage.getItem("showOnlyIcon");
    if (storedShowOnlyIcon) {
      if (storedShowOnlyIcon === "true") {
        setShowOnlyIcon(true);
      } else {
        setShowOnlyIcon(false);
      }
    }
  }, []);

  return (
    <div
      suppressHydrationWarning
      className={`flex flex-col gap-2 bg-white sm:max-w-[260px]  relative z-[100] ${
        showOnlyIcon ? "w-min" : "w-full"
      } h-screen px-4 py-5 transition-[width] transform ease-in-out w-full duration-300`}
    >
      <div className="flex justify-between items-center pl-2 transition-[width] transform ease-in-out duration-300 ">
        <Link href="/" className={`${showOnlyIcon ? "hidden" : "block"}`}>
          <p className="text-black">LOGO</p>
        </Link>
        {/* <Button
          isIconOnly
          className="bg-white"
          onClick={() => setShowOnlyIcon(!showOnlyIcon)}
        >
          <Image src={"/hamburger.svg"} alt="icon" width={40} height={40} />
        </Button> */}
      </div>
      <Spacer y={4}></Spacer>
      <Listbox
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        hideSelectedIcon
        className={`flex flex-col gap-3 p-0 w-full transition-[width] transform ease-in-out duration-300 `}
        classNames={{
          list: ["gap-4 transition-[width] transform ease-in-out duration-300"],
          base: ["w-fit sm:max-w-[300px] w-full"],
        }}
      >
        <ListboxSection
          classNames={{
            group: [
              " flex flex-col gap-3 w-full transition-[width] transform ease-in-out duration-300",
            ],
            heading: [
              "px-3 py-3 text-sm transition-[width] transform ease-in-out block whitespace-nowrap h-[40px] duration-300 ",
              showOnlyIcon ? "opacity-0 w-[0]" : "opacity-100",
            ],
          }}
          className="w-full transition-[width] transform ease-in-out block whitespace-nowrap duration-300"
        >
          <ListboxItem
            className={`${
              pathname === "/dashboard"
                ? "bg-[#007BFF1A] text-[#004085] "
                : "text-black bg-white"
            } ${
              showOnlyIcon ? "gap-0 " : "px-2"
            } transition-[width] transform ease-in-out duration-300 h-[44px] rounded-[0.25rem] flex justify-normal gap-4 `}
            startContent={
              <BiHomeAlt
                size={20}
                color={pathname === "/dashboard" ? "#004085" : "#71839b"}
              />
            }
            endContent={
              <div className="min-w-5 h-5 text-white text-center text-xs rounded-2xl bg-[#007BFF] ml-auto">
                <span className="m-auto text-center  leading-relaxed">2</span>
              </div>
            }
            key="dashboard"
            aria-label="dashboard"
            href="/dashboard"
          >
            <p
              className={`text-base w-full font-semibold transition-[width] transform ease-in-out block duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out duration-300`}
            >
              Dashboard
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/dashboard/records"
                ? "bg-[#007BFF1A] text-[#004085]"
                : "text-black bg-white"
            } ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out duration-300 h-[44px] rounded-[0.25rem] flex justify-normal gap-4`}
            startContent={
              <Microphone
                size="20"
                color={pathname === "/dashboard/records" ? "#004085" : "#71839b"}
              />
            }
            key="records"
            href="/dashboard/records"
          >
            <p
              className={`text-base font-semibold transition-[width] transform ease-in-out block duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out duration-300`}
            >
              Records
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/dashboard/upload"
                ? "bg-[#007BFF1A] text-[#004085]"
                : "text-black bg-white"
            } ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out duration-300 h-[44px] rounded-[0.25rem] flex justify-normal gap-4`}
            startContent={
              <DocumentUpload
                size="20"
                color={pathname === "/upload" ? "#004085" : "#71839b"}
              />
            }
            key="upload"
            href="/dashboard/upload"
          >
            <p
              className={`text-base font-semibold transition-[width] transform ease-in-out block duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out duration-300`}
            >
              Upload
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/dashboard/patients"
                ? "bg-[#007BFF1A] text-[#004085]"
                : "text-black bg-white"
            } ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out duration-300 h-[44px] rounded-[0.25rem] flex justify-normal gap-4`}
            startContent={
              <People
                size="20"
                color={pathname === "/patients" ? "#004085" : "#71839b"}
              />
            }
            key="patients"
            href="/dashboard/patients"
          >
            <p
              className={`text-base font-semibold transition-[width] transform ease-in-out block duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out duration-300`}
            >
              Patients
            </p>
          </ListboxItem>
          <ListboxItem
            className={`${
              pathname === "/dashboard/sessions"
                ? "bg-[#007BFF1A] text-[#004085]"
                : "text-black bg-white"
            } ${
              showOnlyIcon ? "pr-0" : "px-2"
            } transition-[width] transform ease-in-out duration-300 h-[44px] rounded-[0.25rem] flex justify-normal gap-4`}
            startContent={
              <Refresh2
                size="20"
                color={pathname === "/sessions" ? "#004085" : "#71839b"}
              />
            }
            key="sessions"
            href="/dashboard/sessions"
          >
            <p
              className={`text-base font-semibold transition-[width] transform ease-in-out block duration-300 ${
                showOnlyIcon ? "w-[0] px-0" : ""
              }transition-[width] transform ease-in-out duration-300`}
            >
              Sessions
            </p>
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
}
