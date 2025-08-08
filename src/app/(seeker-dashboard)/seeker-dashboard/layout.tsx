"use client";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  DocumentTextIcon,
  HeartIcon,
  ListBulletIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`flex ${poppins.className}`} onClick={handleOutsideClick}>
      <div
        className="fixed top-0 left-0 z-10 flex justify-between p-3 py-1 bg-white shadow w-full lg:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={"/"}>
          {" "}
          <Image alt="logo" width={40} height={40} src={"/assets/logo.png"} />
        </Link>
        {isOpen ? (
          <XMarkIcon
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-6 "
          />
        ) : (
          <ListBulletIcon
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-6 "
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="lg:min-w-80">
        <Sidebar
          userType="seeker"
          menuItems={[
            {
              href: "/seeker-dashboard/",
              icon: <UserIcon className="w-5 h-5" />,
              text: "My Profile",
            },
            {
              href: "/seeker-dashboard/my-bookings",
              icon: <DocumentTextIcon className="w-5 h-5" />,
              text: "My Transactions",
            },
            {
              href: "/seeker-dashboard/wishlist",
              icon: <HeartIcon className="w-5 h-5" />,
              text: "Wishlist",
            },
          ]}
          classname={`${
            isOpen ? "translate-0" : "-translate-x-96"
          } lg:translate-0 `}
        />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

