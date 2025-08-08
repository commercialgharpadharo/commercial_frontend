/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "@/utils/axiosInstace";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckBadgeIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Location {
  _id: string;
  displayName: string;
  googleMapsLocation: string;
}

interface Transaction {
  _id: string;
  room: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "REFUND_RAISED";
  createdAt: string;
  plan?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo: string;
  userType: "owner" | "seeker";
  subscriptionTaken: boolean;
  planType?: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locations: Location[];
  roomsPosted: number;
  planExpiry: string;
  transactions: Transaction[];
}

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const getUserById = async ({ id }: { id: string }) => {
    try {
      const { data } = await api.get(`/admin/get-user/${id}`, {
        withCredentials: true,
      });
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    getUserById({ id });
  });

  if (loading) return <SkeletonLoader  />;
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <Image
            width={100}
            height={100}
            src={user?.photo || ""}
            alt={user?.name || ""}
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">
              {user?.userType === "owner" ? "🏠 Owner" : "🔍 Seeker"}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.subscriptionTaken && (
                <span className="px-3 py-1 text-xs font-semibold bg-yellow-400 text-black rounded-full flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-white" /> {user?.planType}{" "}
                  Plan
                </span>
              )}
              {user?.isVerified && (
                <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full flex items-center gap-1">
                  <CheckBadgeIcon className="w-4 h-4" /> Verified
                </span>
              )}
              {user?.isProfileComplete && (
                <span className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                  Profile Complete
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Contact Info</h3>
            <p className="flex items-center gap-2 text-sm text-gray-700">
              <EnvelopeIcon className="w-4 h-4 text-gray-500" />
              {user?.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-700 mt-1">
              <PhoneIcon className="w-4 h-4 text-gray-500" />
              {user?.phoneNumber}
            </p>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Account Details</h3>
            <p className="text-sm text-gray-700">
              Created:{" "}
              {new Date(user?.createdAt || new Date()).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Updated:{" "}
              {new Date(user?.updatedAt || new Date()).toLocaleDateString()}
            </p>
          </div>

          {/* Owner Specific Info */}
          {user?.userType === "owner" && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-2">
                <h3 className="font-semibold mb-2">Posted Locations</h3>
                <ul className="text-sm text-gray-800 space-y-2">
                  {user?.locations.map((loc: any) => (
                    <li
                      key={loc._id}
                      className="flex items-center justify-between"
                    >
                      <span>{loc.displayName}</span>
                      <a
                        href={loc.googleMapsLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                      >
                        <MapPinIcon className="w-4 h-4" /> Map
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Stats</h3>
                <p className="text-sm text-gray-700">
                  Rooms Posted: {user?.roomsPosted}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Plan Expires:{" "}
                  {new Date(user?.planExpiry).toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {user?.userType === "seeker" && user?.transactions?.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Room ID
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...user.transactions].reverse().map((txn: any) => (
                  <tr key={txn._id}>
                    <td className="px-4 py-2 text-gray-800">{txn.room}</td>
                    <td className="px-4 py-2 text-gray-800">₹{txn.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          txn.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : txn.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : txn.status === "REFUND_RAISED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {txn.status === "REFUND_RAISED" ? (
                        <button
                          //   onClick={() => handleRefund(txn._id)} // Define this function
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                        >
                          Make Refund
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {user?.userType === "owner" && user?.transactions?.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">
            Your Subscription Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Plan
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...user.transactions].reverse().map((txn: any) => (
                  <tr key={txn._id}>
                    <td className="px-4 py-2 text-gray-800">{txn.plan}</td>
                    <td className="px-4 py-2 text-gray-800">₹{txn.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          txn.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : txn.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-gray-400 text-xs">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse" />
        </div>
        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse mt-2"></div>
          </div>
          {/* Account Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
