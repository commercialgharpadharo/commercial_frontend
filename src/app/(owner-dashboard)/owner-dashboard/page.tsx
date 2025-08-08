/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import api from "@/utils/axiosInstace";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useState<null | Owner>(null);
  const [loading, setLoading] = useState(true);

  const getOwner = async () => {
    try {
      const { data } = await api.get("/user/owner-details", {
        withCredentials: true,
      });
      setUserData(data);
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  const stats = [
    {
      icon: <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />,
      label: "Your Listings",
      value:
        userData?.planType === null
          ? ""
          : userData?.planType === "PREMIUM"
          ? "∞"
          : userData?.planType === "FREE"
          ? 1 - userData?.roomsPosted
          : 10 - (userData?.roomsPosted ?? 0),
      extra:
        userData?.planType === null
          ? "No plan active"
          : userData?.planType === "FREE"
          ? "/1 Remaining"
          : userData?.planType === "PRO"
          ? "/10 Remaining"
          : "/Unlimited",
      information:
        "Number of rooms you can post. If value is in minus(-) your plan has expired and the properties are unlisted subscribe to a bigger plan to make them visible",
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-yellow-500" />,
      label: "Properties on Hold",
      value: userData?.pendingPropertiesCount,
      information:
        "Number of Properties which are not visible due to several reasons.",
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-green-500" />,
      label: "Bookings",
      value: userData?.totalBookingsCount,
      information: "Number of user that showed interest in your properties",
    },
  ];

  if (loading) {
    return (
      <div className=" p-3 lg:p-8 pt-20 lg:pt-8 space-y-8 bg-gray-50 min-h-screen">
       <Skeleton />
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-8 space-y-8 bg-gray-50 min-h-screen mt-20 lg:mt-5">
      {/* Avatar Section */}
      <div className="bg-white p-3 lg:p-8 shadow-lg rounded-2xl flex items-center space-x-6">
        <Image
          width={100}
          height={100}
          src={userData?.photo || "/"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <h2 className="text-2xl font-semibold">{userData?.name}</h2>
          <p className="text-gray-500 text-sm">{userData?.email}</p>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white p-8 shadow-lg rounded-2xl space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          User Information
        </h3>

        <div className="grid lg:grid-cols-2 gap-6">
          <InfoBlock label="Full Name" value={userData?.name || ""} />
          <InfoBlock label="User Type" value={"Owner"} />
          <InfoBlock label="Email Address" value={userData?.email || ""} />
          <InfoBlock label="Phone" value={`+91 ${userData?.phoneNumber}`} />
          <InfoBlock label="Plan" value={userData?.planType || ""} />
          <InfoBlock
            label="Plan Validity"
            value={
              userData?.planExpiry
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(userData?.planExpiry)) // Directly using the ISO 8601 string
                : "N/A"
            }
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition duration-300 ease-in-out relative"
          >
            <InformationCircleIcon
              title={item.information}
              className="w-5 absolute top-2 right-2 text-primary"
            />
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
              {item.icon}
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="text-xl font-bold text-gray-800">
                {item.value}
                <span className="text-gray-400 text-sm font-normal">
                  {" "}
                  {item.extra || ""}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper Component for Reusability
const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium">{label}</label>
    <div className="w-full border border-gray-300 p-3 rounded-lg text-gray-700">
      {label === "Plan" && !value ? (
        <Link className="text-primary font-medium" href="/pricing">
          Choose Plan
        </Link>
      ) : (
        value
      )}
    </div>
  </div>
);

export default Dashboard;

const Skeleton = () => (
  <div className=" space-y-8 bg-gray-50 min-h-screen">
    {/* Avatar Section */}
    <div className="bg-white p-3 lg:p-8 shadow-lg rounded-2xl flex items-center space-x-6 animate-pulse">
      <div className="w-24 h-24 bg-gray-300 rounded-full" />
      <div className="space-y-4">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
        <div className="w-48 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>

    {/* User Information */}
    <div className="bg-white p-3 lg:p-8 shadow-lg rounded-2xl space-y-6 animate-pulse">
      <h3 className="w-32 h-6 bg-gray-300 rounded"></h3>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-white shadow-lg rounded-2xl space-x-4"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-full" />
            <div className="flex-1">
              <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  </div>
);
