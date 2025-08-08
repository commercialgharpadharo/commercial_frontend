"use client";

import api from "@/utils/axiosInstace";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [allUsers, setAllUsers] = useState<user[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<user[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const getAllUsers = async () => {
    try {
      const { data } = await api.get("/admin/get-users");
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      console.log(users);
      setAllUsers(users);
      setFilteredUsers(users);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let users = [...allUsers];

    if (userTypeFilter !== "all") {
      users = users.filter((user) => user.userType === userTypeFilter);
    }

    if (planFilter !== "all") {
      users = users.filter(
        (user) =>
          user.subscriptionTaken &&
          user.planType?.toLowerCase() === planFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      users = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(lower) ||
          user.email?.toLowerCase().includes(lower) ||
          user.phoneNumber?.toLowerCase().includes(lower)
      );
    }

    setFilteredUsers(users);
  }, [searchQuery, userTypeFilter, planFilter, allUsers]);

  const formatText = (text: string) =>
    text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase();

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      console.log("Deleting user with ID:", userId);
      // You can trigger the delete API here
    }
  };

  return (
    <div className="p-3 md:p-8 min-h-screen bg-gradient-to-br from-[#f0f4ff] to-white pt-20 lg:pt-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 max-w-[93vw] lg:max-w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          👥 All Users
        </h1>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring focus:border-blue-500 w-full md:w-60"
          />
          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm w-full md:w-auto"
          >
            <option value="all">All Types</option>
            <option value="owner">Owner</option>
            <option value="seeker">Seeker</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm w-full md:w-auto"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      <div className="">
        <div className="rounded-xl shadow-xl bg-white/60 backdrop-blur border border-gray-200 overflow-hidden overflow-x-scroll max-w-[93vw] lg:max-w-full">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-white border-b text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">User Type</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Rooms</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 relative"
                >
                  <td className="px-4 py-3">
                    <Image
                      src={user.photo}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full border border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[150px] truncate">
                    <Link href={`/admin-dashboard/users/${user._id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">{user.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.userType === "owner"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {formatText(user.userType)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.userType === "seeker" ? (
                      <span className="text-xs text-gray-400 italic">
                        Not Applicable
                      </span>
                    ) : user.subscriptionTaken ? (
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          user.planType === "FREE"
                            ? "bg-green-100 text-green-700"
                            : user.planType === "PRO"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {formatText(user.planType)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Not Subscribed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {user.userType === "owner"
                      ? user.roomsPosted ?? 0
                      : user.unlockedRooms?.length ?? 0}
                  </td>
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() =>
                        setOpenMenu((prev) =>
                          prev === user._id ? null : user._id
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <EllipsisVerticalIcon className="w-5" />
                    </button>

                    {openMenu === user._id && (
                      <div className="absolute right-4 mt-2 bg-white border border-gray-200 shadow-md rounded-md z-10">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No users found 🕵️
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
