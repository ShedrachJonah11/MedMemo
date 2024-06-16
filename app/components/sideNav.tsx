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

type ModalProps = {
  openModal: (e: { preventDefault: () => void }) => void;
};

export default function Nav({ openModal }: ModalProps) {
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
      className={`flex flex-col gap-2 bg-white sm:max-w-[260px]   ${
        showOnlyIcon ? "w-min" : "w-full"
      } h-screen px-4 py-5 transition-[width] flex justify-between flex-col items-start transform ease-in-out w-full duration-300`}
    >
      <div className="w-full">
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
            list: [
              "gap-4 transition-[width] transform ease-in-out duration-300",
            ],
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
                  color={pathname === "/records" ? "#004085" : "#71839b"}
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

      <div className="flex justify-start flex-col gap-3 items-start w-full">
        <button
          className="flex justify-start items-center gap-4 p-3"
          onClick={(e) => openModal(e)}
        >
          <Image src={"/login.svg"} width={20} height={20} alt="" />
          <p className="text-[#343A40] text-[16px] font-[500]">Log out</p>
        </button>

        <Link
          href={"/dashboard/profile"}
          className={`${
            pathname === "/dashboard/profile" ? "bg-[#E6F2FF]" : ""
          } rounded-[8px] p-3 flex justify-start items-center gap-2 w-full`}
        >
          <div className="relative">
            <div className="w-full">
              <Image src={"/avatar.svg"} width={48} height={48} alt="" />
            </div>
            <div className="w-3 h-3 rounded-full bg-[#03CA2F] border-[2px] border-white absolute right-[2px] bottom-[2px]"></div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex justify-between items-center gap-6">
              <p className="text-[#343A40] text-[12px]">John Doe</p>
              <div className="flex justify-center items-center bg-[#004085] rounded-full text-white text-[10px] font-[600] px-2 py-1">
                <p>Free plan</p>
              </div>
            </div>
            <p className="text-[#71839B] text-[12px]">Johndoe@gmail.com</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
