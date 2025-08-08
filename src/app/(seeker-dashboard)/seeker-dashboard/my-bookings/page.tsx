/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/axiosInstace";

const Page = () => {
  const [postStatus, setPostStatus] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [bookings, setBookings] = useState<null | any[]>(null);
  const [filteredBookings, setFilteredBookings] = useState<null | any[]>(null);
  const [loadingRefundId, setLoadingRefundId] = useState<string | null>(null);

  const getMyBookings = async () => {
    try {
      const response = await api.get("/user/my-bookings");
      if (response.status === 200) {
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefundRequest = async (bookingId: string) => {
    setLoadingRefundId(bookingId);
    try {
      await api.post(`/user/request-refund`, {
        bookingId,
      });
      alert("Refund request submitted! ✅");
      getMyBookings(); // refresh data
    } catch (error) {
      alert("Failed to request refund. ❌");
      console.error(error);
    } finally {
      setLoadingRefundId(null);
    }
  };

  useEffect(() => {
    if (!bookings) return;

    let temp = [...bookings];

    if (postStatus) {
      temp = temp.filter((b) => b.status === postStatus);
    }

    if (searchTitle.trim()) {
      temp = temp.filter((b) =>
        b.roomDetails?.name
          ?.toLowerCase()
          .includes(searchTitle.trim().toLowerCase())
      );
    }

    setFilteredBookings(temp);
  }, [searchTitle, postStatus, bookings]);

  useEffect(() => {
    getMyBookings();
  }, []);

  return (
    <div className="pt-20 p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">My Transactions</h2>

      {/* Filters */}
      <div className="bg-white w-full p-4 rounded-2xl shadow-md flex flex-col lg:flex-row gap-4 mb-8 max-w-screen lg:max-w-max">
        <div className="w-full  lg:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full border rounded-lg p-2"
            value={postStatus}
            onChange={(e) => setPostStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        <div className=" lg:flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Title
          </label>
          <input
            type="text"
            placeholder="Search by title"
            className="w-full border rounded-lg p-2"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction Table */}
      {filteredBookings && filteredBookings.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto max-w-[90vw] lg:max-w-full">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Room Title
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
              {[...filteredBookings].reverse().map((txn: any) => (
                <tr key={txn._id}>
                  <td className="px-4 py-2 text-gray-800">
                    {txn.roomDetails?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-gray-800">₹{txn.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : txn.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : txn.status === "REFUNDED"
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
                    {txn.status === "COMPLETED" && !txn.refundRequested && (
                      <button
                        onClick={() => handleRefundRequest(txn._id)}
                        disabled={loadingRefundId === txn._id}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md disabled:opacity-50"
                      >
                        {loadingRefundId === txn._id
                          ? "Requesting..."
                          : "Raise Refund"}
                      </button>
                    )}
                    {txn.refundRequested && (
                      <span className="text-xs text-gray-500 italic">
                        Refund Requested
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No transactions found.
        </div>
      )}
    </div>
  );
};

export default Page;
