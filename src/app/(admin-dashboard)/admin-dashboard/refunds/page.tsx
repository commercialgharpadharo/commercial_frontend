/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Transaction } from "@/types/transactions";
import api from "@/utils/axiosInstace";
import React, { useState, useEffect } from "react";

const RefundTablePage = () => {
  const [data, setData] = useState<Transaction[] | []>([]);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getActiveRefunds = async () => {
    try {
      const { data } = await api.get(`/admin/get-active-refunds`);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // Return `null` to prevent crashes
    }
  };
  useEffect(() => {
    const fetchRefunds = async () => {
      const res = await getActiveRefunds();
      setData(res);
    };
    fetchRefunds();
  }, []);

  const handleRefundClick = (refund: string) => {
    try {
      const res = api.put(`/payment/refund/${refund}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmRefund = () => {
    // console.log("Refund marked as completed for:", selectedRefund._id);
    setShowModal(false);
    setSelectedRefund(null);
    // 🔁 Later, you can trigger an API call here
  };

  return (
    <div className="p-3 lg:p-6 pt-20 lg:pt-6">
      <h1 className="text-2xl font-semibold mb-4">Active Refund Requests</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">No refund requests found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 max-w-[93vw]">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left whitespace-nowrap">Seeker</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Phone</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Amount</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Room</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Transaction ID</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Date</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((refund) => (
                <tr key={refund._id}>
                  <td className="px-4 py-2 whitespace-nowrap">{refund.seeker?.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{refund.seeker?.phoneNumber}</td>
                  <td className="px-4 py-2 whitespace-nowrap">₹{refund.amount}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-yellow-600 font-medium">
                    {refund.room}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-600 whitespace-nowrap">
                    {refund.transactionId}
                  </td>
                  <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                    {new Date(refund.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRefundClick(refund.transactionId)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark as Refunded
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-3">Confirm Action</h2>
            <p className="mb-4">
              Are you sure you want to mark this refund as <b>completed</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTablePage;
