"use client";
import {
  Avatar,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FiFileText, FiBox } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { TbBell, TbSmartHome } from "react-icons/tb";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { SearchNormal1, Notification, CloseCircle } from "iconsax-react";
import { IoMdClose } from "react-icons/io";
import { NotificationCard } from "./notificationCard";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const pathname = usePathname();
  function pageName() {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/order-management":
        return "Order Management";
      case "/admin/customers":
        return "Customers";
      case "/admin/transactions":
        return "Transactions";
      case "/admin/add-categories":
        return "Add Categories";
      case "/admin/add-products":
        return "Add Products";
      case "/admin/product-list":
        return "Product List";
      default:
        return "Dashboard";
    }
  }

  const nav = useCallback(() => {
    return (
      <div>
        <Navbar
          onMenuOpenChange={setIsMenuOpen}
          maxWidth="2xl"
          className="px-5 bg-white h-[64px] "
          classNames={{
            wrapper: ["px-0", "bg-transparent"],
          }}
          suppressHydrationWarning
        >
          {/* <NavbarContent>
          <NavbarBrand>
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="font-bold text-2xl text-[#23272E]">
                  {pageName()}
                </span>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent> */}

          <NavbarContent justify="end" className="ml-auto">
            <div className="flex justify-normal items-center gap-8">
              <Button
                isIconOnly
                color="warning"
                variant="flat"
                className="bg-transparent"
                onClick={onOpen}
              >
                <SearchNormal1 size="24" color="black" />
              </Button>
              <Popover
                isOpen={notificationIsOpen}
                onOpenChange={(open) => setNotificationIsOpen(open)}
                key={"notification"}
                showArrow={false}
                offset={10}
                placement="bottom-end"
                backdrop={"blur"}
                className="w-[420px] bg-[#E9ECEF]  rounded-lg"
              >
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    color="warning"
                    variant="flat"
                    className="bg-transparent"
                  >
                    <Notification size="24" color="black" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full flex flex-col align-top justify-normal bg-[#E9ECEF] p-3 py-1 min-h-[300px] max-h-[400px] h-full rounded-lg">
                  {(titleProps) => (
                    <div className="px-1 py-1 w-full">
                      <div className="flex justify-between items-center">
                        <p
                          className="text-base font-semibold text-[#343A40]"
                          {...titleProps}
                        >
                          Notifications
                        </p>
                        <Button
                          isIconOnly
                          className="bg-transparent"
                          onPress={() => {
                            setNotificationIsOpen(false);
                          }}
                        >
                          <IoMdClose color="black" size={24} />
                        </Button>
                      </div>
                      <div className="mt-2 flex flex-col gap-2 w-full">
                        <NotificationCard
                          status={"completed"}
                        ></NotificationCard>
                        <NotificationCard
                          status={"unsuccessful"}
                        ></NotificationCard>
                        <NotificationCard status={"ongoing"}></NotificationCard>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </NavbarContent>
        </Navbar>
        <Modal
          // size="2xl"
          className="bg-transparent shadow-none max-h-[500px] max-w-[480px] w-full"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          closeButton={<div></div>}
          placement="top"
        >
          <ModalContent>
            <ModalHeader>
              <Input
                placeholder="Search for patient"
                radius="sm"
                aria-label="product name"
                className=" rounded-lg w-full h-[48px]"
                classNames={{
                  label: "text-base",
                  input: "py-2 text-base",
                  inputWrapper: [
                    "bg-white",
                    "data-focus-[within=true]:bg-white",
                    "data-[hover=true]:bg-white",
                    "group-data-[focus=true]:bg-white",
                  ],
                }}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                startContent={<SearchNormal1 size="24" color="#71839B" />}
                endContent={
                  <CloseCircle
                    size="16"
                    color="#71839b"
                    className="cursor-pointer"
                    variant="Bold"
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  />
                }
              ></Input>
            </ModalHeader>
            <ModalBody>
              <div className="bg-white rounded-md flex flex-col gap-4 p-3">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-[#71839B]">Patients</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col p-3 rounded-md gap-1 bg-[#EDEDED]">
                      <p className="text-[#343A40] text-sm font-medium">
                        Desmond Julius Wanker
                      </p>
                      <p className="text-[#71839B]">
                        <span>11-05-2010</span>•<span>Male</span>•
                        <span>+2349000000000</span>
                      </p>
                    </div>
                    <div className="flex flex-col p-3 rounded-md gap-1 bg-[#EDEDED]">
                      <p className="text-[#343A40] text-sm font-medium">
                        Desmond Julius Wanker
                      </p>
                      <p className="text-[#71839B]">
                        <span>11-05-2010</span>•<span>Male</span>•
                        <span>+2349000000000</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-[#71839B]">Sessions</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col p-3 rounded-md gap-1 bg-[#EDEDED]">
                      <p className="text-[#343A40] text-sm font-medium">
                        Desmond Julius Wanker
                      </p>
                      <p className="text-[#71839B]">
                        <span>11-05-2010</span>•<span>11:50PM</span>•
                        <span>2 Mins long</span>
                      </p>
                    </div>
                    <div className="flex flex-col p-3 rounded-md gap-1 bg-[#EDEDED]">
                      <p className="text-[#343A40] text-sm font-medium">
                        Desmond Julius Wanker
                      </p>
                      <p className="text-[#71839B]">
                        <span>11-05-2010</span>•<span>11:50PM</span>•
                        <span>2 Mins long</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }, [isMenuOpen, pageName, pathname]);

  return nav();
}
