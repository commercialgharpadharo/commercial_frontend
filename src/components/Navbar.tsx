"use client";

import { useLogin } from "@/context/LoginContext";
import { UserIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
  ArrowLeftEndOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface userType {
  name: string;
  email: string;
  phone: string;
  userType: string;
  photo: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoginOpen } = useLogin();
  const { setHasReviewed } = useLogin();
  const [user, setUser] = useState<userType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/get-user-info`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      setUser(data);
      setHasReviewed(data.hasReviewed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    // { href: "https://career.gharpadharo.com/", label : "Careers"},
    // { href: "https://blog.gharpadharo.com/", label: "Blog" }
  ];

  const loggedInLinks =
    user?.userType === "owner"
      ? [
          { href: "/owner-dashboard", label: "Dashboard" },
          // { href: "/owner-profile", label: "Profile" },
          { href: "/owner-dashboard/bookings", label: "Bookings" }, //owner-bookings done by shubham
          {
            href: "/owner-dashboard/properties/add-properties",
            label: "Add Property",
          }, //property/add    done by shubham
        ]
      : user?.userType === "admin"
      ? [
          { href: "/admin-dashboard", label: "Dashboard" },
          // { href: "/admin-profiles", label: "Profiles" },
        ]
      : [
          { href: "/seeker-dashboard", label: "Dashboard" },
          { href: "/seeker-profile", label: "Profile" },
          { href: "/seeker-bookings", label: "Bookings" },
        ];

  return (
    <div className="flex items-center justify-between px-2 lg:px-5 py-3 fixed z-[999] w-screen bg-white shadow-lg rounded">
      {/* Sidebar */}
      <div
        className={`fixed h-screen w-screen bg-black/50 left-0 top-0 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <XMarkIcon
          className="absolute top-5 right-4 w-8 cursor-pointer text-white"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Content */}
        <div
          className={`bg-white h-full w-[85%] flex flex-col transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <Link href={"/"} className="flex items-center shadow p-2 rounded">
            <Image alt="logo" src={"/assets/logo.png"} width={60} height={60} />
            <h1 className="font-semibold text-lg">GharPadharo</h1>
          </Link>

          {/* User Info / Login */}
          <div className="p-5">
            {user ? (
              <div className="flex flex-col gap-5">
                <Link
                  href={
                    user?.userType === "admin"
                      ? "/admin-dashboard"
                      : user?.userType === "owner"
                      ? "/owner-dashboard"
                      : "/seeker-dashboard"
                  }
                  className="flex items-center space-x-3"
                >
                  <Image
                    src={user?.photo}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {user?.userType &&
                        user?.userType?.charAt(0).toUpperCase() +
                          user?.userType?.slice(1)}
                    </p>
                  </div>
                </Link>
                <div
                  id="dropdown"
                  className={` h-fit py-2      flex flex-col gap-2`}
                >
                  {loggedInLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`hover:text-secondary transition ${
                        pathname === link.href
                          ? "text-secondary font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-black rounded-md text-sm font-semibold flex items-center space-x-1 w-fit z-10"
              >
                <UserIcon className="w-5" /> <span>Login</span>
              </button>
            )}
          </div>

          <hr className="text-gray-200 mx-5" />

          {/* Links */}
          <ul className="flex flex-col space-y-5 font-medium p-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`hover:text-secondary transition ${
                  pathname === link.href
                    ? "text-secondary font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <li
              onClick={() => handleLogout()}
              className="flex items-center gap-2"
            >
              <ArrowLeftEndOnRectangleIcon className="w-5" />
              <span>Logout</span>
            </li>
            <li>
              <Link
                href="/owner-dashboard/properties/add-properties"
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-semibold text-black bg-white hover:shadow-md"
              >
                <span>Post property</span>
                <span className="bg-[#525599] text-white text-xs font-bold px-2 py-0.5 rounded">
                  FREE
                </span>
              </Link>
            </li>
          </ul>

          <hr className="text-gray-200 mx-5" />

          {/* Contact Us */}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center">
        <Image alt="logo" src={"/assets/logo.png"} width={60} height={60} />
        <h1 className="font-semibold text-lg  md:inline">
          Commercial.GharPadharo
        </h1>
      </div>

      {/* Desktop Links */}
      <ul className="hidden lg:flex space-x-5 font-medium">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`hover:text-secondary transition ${
              pathname === link.href
                ? "text-secondary font-semibold"
                : "text-gray-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <li className="ml-8">
          {" "}
          {/* Add left margin here */}
          <Link
            href="/owner-dashboard/properties/add-properties"
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-semibold text-black bg-white hover:shadow-md"
          >
            <span>Post property</span>
            <span className="bg-[#525599] text-white text-xs font-bold px-2 py-0.5 rounded">
              FREE
            </span>
          </Link>
        </li>
      </ul>

      {/* User Profile / Login Button */}
      <div className="flex items-center space-x-5">
        {user ? (
          <div className=" md:flex items-center md:space-x-2 hidden">
            <Image
              src={user?.photo}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full border border-gray-300"
            />
            <div
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex cursor-pointer"
            >
              <p className="text-sm font-bold text-gray-700">{user.name}</p>
              <ChevronDownIcon className="w-5" />
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className={`absolute h-fit py-2 pb-5  bg-white top-20 rounded shadow right-10 flex flex-col gap-2`}
                >
                  <span className="text-netural font-semibold px-8">
                    {user?.userType?.charAt(0).toUpperCase() +
                      user?.userType?.slice(1)}
                  </span>
                  <hr className="text-gray-300 " />
                  {loggedInLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`hover:text-secondary transition px-8 ${
                        pathname === link.href
                          ? "text-secondary font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // <button
          //   onClick={() => setIsLoginOpen(true)}
          //   className="bg-buttons text-white py-2 px-4 rounded-md text-sm font-semibold flex items-center space-x-1"
          // >
          //   <UserIcon className="w-5" /> <span>Login</span>
          //   <span className="hidden md:inline">/Register</span>
          // </button>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="relative bg-violet-700 hover:bg-blue-800 text-white px-2.5 py-1.5 rounded-full flex items-center space-x-1.5 transition duration-200"
          >
            {/* User Icon with Notification Dot */}
            <div className="relative w-4 h-4">
              <UserIcon className="w-4 h-4" />
              <span className="absolute -top-[2px] -right-[2px] block h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white" />
            </div>

            {/* Dropdown Arrow */}
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        )}

        {/* Hamburger Menu */}
        <div onClick={() => setIsOpen(true)} className="lg:hidden" id="ham">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
