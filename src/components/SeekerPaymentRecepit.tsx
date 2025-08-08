"use client";
import { CreditCardIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import PaymentPage from "./SeekerPaymentButton";

const SeekerPaymentRecepit = ({
  roomId,
  seekerInfo,
  propertyName,
  ownerId,
}: {
  roomId: string;
  seekerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  propertyName: string;
  ownerId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={` w-full rounded-2xl font-bold mt-10 text-center`}>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex justify-center items-center rounded-full w-full p-4 border bg-[#1563df] text-white text-center font-medium cursor-pointer"
      >
        <CreditCardIcon className={`w-5 h-5 mr-2 `} />
        Get Owner Info
      </button>
      {isOpen && (
        <div className="fixed top-0 inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-black" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Billing Summary</h3>
            <ul className="mb-4 text-sm">
              <li className="flex justify-between">
                <span>Base Amount</span> <span>₹{100}</span>
              </li>
              <li className="flex justify-between">
                <span>GST (18%)</span> <span>₹{(100 * 0.18).toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Platform Fee</span> <span>₹12</span>
              </li>
              <hr className="my-2" />
              <li className="flex justify-between font-bold text-lg">
                <span>Total</span>{" "}
                <span>₹{(100 + 100 * 0.18 + 12).toFixed(2)}</span>
              </li>
            </ul>
            <PaymentPage
              price={130}
              roomId={roomId}
              seekerInfo={seekerInfo}
              propertyName={propertyName}
              ownerId={ownerId}
            />
            <button
              className="mt-2 text-gray-600 underline text-sm w-full cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeekerPaymentRecepit;
