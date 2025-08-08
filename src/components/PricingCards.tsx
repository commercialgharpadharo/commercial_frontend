/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import PaymentPage from "./PaymentButton";
import api from "@/utils/axiosInstace";
import { useRouter } from "next/navigation";

export const PricingCard = ({
  name,
  price,
  features,
  popular,
  className,
  buttonClass,
  inUse,
  userDetails,
  expiryDays,
  canDowngrade,
  onUpgradeClick,
}: {
  name: string;
  price: number;
  features: { name: string; available: boolean }[];
  popular: boolean;
  className: string;
  buttonClass: string;
  inUse: boolean;
  expiryDays: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
    userType: string;
  } | null;
  canDowngrade: boolean;
  onUpgradeClick: (planInfo: {
    name: string;
    price: number;
    expiryDays: number;
  }) => void;
}) => {
  const [showBilling, setShowBilling] = useState(false);
  const router = useRouter();

  const handelBilling = async (amount: number) => {
    // Checkign if user is appling for free
    if (amount === 0) {
      try {
        const res = await api.put("/user/update-user-plan", {
          planType: name,
          expiryDays: expiryDays,
        });
        if (res.status === 200) {
          router.push("/pricing?status=success");
        }
      } catch (error) {}
      return;
    } else {
      setShowBilling(true);
    }
  };

  return (
    <div
      className={`p-10 rounded-3xl shadow-xl flex flex-col gap-3 static lg:relative max-w-[426px] ${className}`}
    >
      {popular && (
        <div className="absolute top-5 right-5 p-2 px-5 bg-white text-sm font-semibold rounded-full text-blue-400">
          <span>Popular</span>
        </div>
      )}
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="flex items-end">
        <span className="text-4xl font-bold">
          {price === 0 ? "Free" : `₹${price}`}
        </span>
        {price !== 0 && (
          <span className="text-xl opacity-50">
            /{expiryDays === 90 ? "3" : "6"} month
          </span>
        )}
      </div>
      <p className="text-sm">
        The perfect way to get started and get used to our platform.
      </p>
      <hr className="opacity-70" />
      <div className="flex flex-col gap-3">
        {features.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              !item.available ? "line-through" : ""
            }`}
          >
            <CheckIcon className="w-5" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (!inUse) {
            onUpgradeClick({ name, price, expiryDays });
          }
        }}
        className={`w-full rounded-2xl font-bold mt-10 text-center py-5 ${
          inUse || !canDowngrade || userDetails?.userType === "seeker"
            ? "cursor-not-allowed"
            : "cursor-pointer"
        } ${buttonClass}`}
        disabled={inUse || !canDowngrade || userDetails?.userType === "seeker"}
      >
        {inUse
          ? "Currently Using"
          : !canDowngrade
          ? "Using Higher Plan"
          : userDetails?.userType === "seeker"
          ? "Not Applicable for Seekers"
          : price === 0
          ? "Start for Free"
          : "Upgrade Plan"}
      </button>

      {/* Billing Popup */}
      {/* {showBilling && (
        <div className="absolute lg:fixed top-0 inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-black">
            <h3 className="text-xl font-bold mb-4">Billing Summary</h3>
            <ul className="mb-4 text-sm">
              <li className="flex justify-between">
                <span>Base Amount</span> <span>₹{price}</span>
              </li>
              <li className="flex justify-between">
                <span>GST (18%)</span> <span>₹{(price * 0.18).toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Platform Fee</span> <span>₹12</span>
              </li>
              <hr className="my-2" />
              <li className="flex justify-between font-bold text-lg">
                <span>Total</span>{" "}
                <span>₹{(price + price * 0.18 + 12).toFixed(2)}</span>
              </li>
            </ul>
            <PaymentPage
              expiryDays={expiryDays}
              userInfo={userDetails}
              name={name}
              amount={Math.round(price + price * 0.18 + 12)}
              className="bg-blue-500 text-white w-full rounded-md py-2 mt-2"
              inUse={inUse}
            />
            <button
              className="mt-2 text-gray-600 underline text-sm w-full cursor-pointer"
              onClick={() => setShowBilling(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

