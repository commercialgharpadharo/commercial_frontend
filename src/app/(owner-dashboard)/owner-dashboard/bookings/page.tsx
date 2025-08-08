"use client";

import api from "@/utils/axiosInstace";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Seeker = {
  name: string;
  email: string;
  phoneNumber: string;
};

type Room = {
  name: string;
  primeLocation: string;
  type: string;
};

type Lead = {
  seeker: Seeker;
  room: Room;
  bookedAt: string;
};

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const getLeads = async () => {
    try {
      const res = await api.get("/user/my-leads");
      setLeads(res.data.leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  if (loading)
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          📋 Property Leads
        </h1>
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seeker
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className="animate-pulse hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="h-4 bg-gray-300 rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 text-sm flex items-center gap-3">
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <div className="p-4 lg:mt-5 mt-16">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

      {leads.length === 0 ? (
        <p className="text-gray-500">No leads found 💤</p>
      ) : (
        <div className="overflow-x-scroll w-screen lg:w-full shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seeker
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((item, index) => {
                const phone = item.seeker.phoneNumber || "0000000000";
                const email = item.seeker.email || "";
                return (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 text-nowrap line clam">
                      {item.room.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.room.primeLocation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.room.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.seeker.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.bookedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-3">
                      <Link href={`mailto:${email}`} title="Email">
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/color/48/gmail--v1.png"
                          alt="gmail--v1"
                        />
                      </Link>
                      <Link href={`tel:${phone}`} title="Call">
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/color/48/phone.png"
                          alt="phone"
                        />
                      </Link>
                      <Link
                        href={`https://wa.me/${phone}`}
                        title="WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          width="32"
                          height="32"
                          src="https://img.icons8.com/color/48/whatsapp--v1.png"
                          alt="whatsapp--v1"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
