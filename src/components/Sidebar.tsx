/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import api from "@/utils/axiosInstace";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";

// --------- TYPES ---------
type MenuItemType = {
  href: string;
  icon: React.ReactNode;
  text: string;
};

// --------- SIDEBAR COMPONENT ---------
const Sidebar = ({
  classname,
  menuItems,
  userType,
}: {
  classname: string;
  userType: string;
  menuItems: MenuItemType[];
}) => {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await (userType === "admin"
          ? api.get("/admin/admin-details")
          : api.get("/user/get-user-info"));
        setUser(resp.data);
        if(resp.status === 401) {
          window.location.href = "/login";
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
        if (error.response?.status === 403) {
          window.location.href = "/login";
        }
        if (error.response?.status === 500) {
          window.location.href = "/login";
        }
        if (error.response?.status === 404) {
          window.location.href = "/login";
        }
        if (error.response?.status === 400) {
          window.location.href = "/login";
        }
      }
    };

    getUser();
  }, [userType]);

  const logoutHandler = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <div
      className={`min-h-screen max-h-screen w-80 bg-white text-secondary flex flex-col fixed shadow-xl z-50 transition-all duration-500 ${classname}`}
    >
      {/* Logo */}
      <div className="flex items-center p-5 space-x-2">
        <span className="text-primary text-2xl font-bold">GharPadharo</span>
      </div>

      {/* Profile */}
      <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
        <Image
          className="rounded-full overflow-hidden"
          src={user?.photo || "/user"}
          width={40}
          height={40}
          alt="user"
        />
        <div>
          <p className="text-gray-300 text-sm font-semibold">{user?.name}</p>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 py-2">
        {menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            href={item.href}
            icon={item.icon}
            text={item.text}
          />
        ))}
      </nav>

      {/* Add Property Button */}
      <div className="mt-auto">
        <button
          onClick={logoutHandler}
          className="flex items-center w-full px-4 py-3 hover:bg-yellow-600 text-black font-semibold"
        >
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

// --------- MENU ITEM COMPONENT ---------
const MenuItem = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <Link href={href} className="block">
      <div className="flex items-center px-4 py-4 cursor-pointer space-x-3 text-secondary hover:bg-gray-800 rounded-md">
        {icon}
        <span className="text-sm">{text}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
