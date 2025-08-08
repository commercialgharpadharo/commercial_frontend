/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import api from "@/utils/axiosInstace";
import { ReceiptRefundIcon } from "@heroicons/react/20/solid";
import React from "react";

const raiseRefund = async ({ uuid }: { uuid: string }) => {
  try {
    const { data } = await api.put(`/user/raise-refund/${uuid}`, {});
    return data;
  } catch (error) {
    return null;
  }
};

const RaiseRefund = ({ uuid }: { uuid: string }) => {
  return (
    <button
      onClick={() => {
        raiseRefund({ uuid });
      }}
      className="flex justify-center items-center rounded-full w-full p-4 border bg-[#1563df]  text-white text-center font-medium cursor-pointer "
    >
      <ReceiptRefundIcon className="w-5 h-5 mr-2" />
      Request a refund
    </button>
  );
};

export default RaiseRefund;
