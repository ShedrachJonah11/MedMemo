import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "../public/vetmemo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userLoggedin } from "@/application/utils/functions";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLogedin, setLogin] = useState(false);

  useEffect(() => {
    if (userLoggedin()) {
      setLogin(true);
    }
  }, []);
  useEffect(() => {
    // Function to check if window exists (client-side) and update isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Call handleResize on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const pathname = usePathname() || "/";

  return (
    <Navbar maxWidth="xl" className="shadow p-0 md:px-6 top-[0] bg-[#FAF9F6] ">
      <NavbarBrand
        className="w-fit flex-grow-[0.4] md:flex-grow-[0.6] "
        as={Link}
        href="/"
      >
        <Image src={logo} alt="logo" width={200} height={50} />
      </NavbarBrand>

      {/* Conditional rendering based on screen size */}
      {isMobile ? (
        <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
      ) : (
        <NavbarContent className="flex items-center ml-">
          <NavbarItem>
            <Link href={"/"}>
              <h1 className="text-black mr-6">Home</h1>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={"/about"}>
              <h1 className="text-black mr-6">About us</h1>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/#Pricing"
              className={`${pathname.includes("/#Pricing")} text-black`}
            >
              <h1 className="text-black">Pricing</h1>
            </Link>
          </NavbarItem>

          {/* Right  */}
          <div className="ml-auto flex items-center">
            {isLogedin ? (
              <>
                <Link href={"/dashboard"}>
                  <Button size="md" className="bg-[#008080] px-10">
                    <h1 className="text-white font-semibold">Dashboard</h1>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <NavbarItem className="mr-4">
                  <Link href={"/auth/login"} className="text-black font-medium">
                    Login
                  </Link>
                </NavbarItem>
                <Link href={"/auth/login"}>
                  <Button size="md" className="bg-[#008080] px-10">
                    <h1 className="text-white font-semibold">Get Started</h1>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </NavbarContent>
      )}

      {/* Conditionally render the NavbarMenu when the hamburger menu is active */}
      {isMenuOpen && (
        <NavbarMenu>
          <NavbarItem>
            <Link onClick={handleCloseMenu} href={"/"}>
              <h1 className="text-black mr-6">Home</h1>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link onClick={handleCloseMenu} href={"/about"}>
              <h1 className="text-black mr-6">About us</h1>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/#Pricing"
              onClick={handleCloseMenu}
              className={`${pathname.includes("/#Pricing")} text-black`}
            >
              <h1 className="text-black">Pricing</h1>
            </Link>
          </NavbarItem>
          <NavbarItem className="mr-4">
            <Link
              onClick={handleCloseMenu}
              href={"/auth/login"}
              className="text-black font-semibold"
            >
              Login
            </Link>
          </NavbarItem>
          <Button size="md" className="bg-[#008080] px-6">
            <Link onClick={handleCloseMenu} href={"/auth/signup"}>
              <h1 className="text-white font-semibold">Get Started</h1>
            </Link>
          </Button>
        </NavbarMenu>
      )}
    </Navbar>
  );
}
