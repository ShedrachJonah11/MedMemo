"use client";
import {
  Avatar,
  Badge,
  Button,
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
import { SearchNormal1, Notification } from "iconsax-react";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
 const nav=useCallback(() => {
    return (
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
          <div className="flex justify-normal gap-8">
            <SearchNormal1 size="24" color="black" />
            <Notification size="24" color="black" />
          </div>
        </NavbarContent>
      </Navbar>
    );
  },[isMenuOpen, pageName, pathname])
  return (
   nav()
  );
}
