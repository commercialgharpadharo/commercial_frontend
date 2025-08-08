/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import Script from "next/script";
import api from "@/utils/axiosInstace";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = ({
  className,
  amount,
  inUse,
  name,
  userInfo,
  expiryDays,
}: {
  className: string;
  amount: number;
  inUse: boolean;
  name: string;
  expiryDays: number;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  } | null;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const handelPayment = async () => {
    setIsProcessing(true);

    try {
      const response = await api.post("/payment/create-order", {
        amount: amount,
        validTill: expiryDays,
        plan: name,
      });
      const data = await response.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "GharPadharo",
        description: `Upgrading to ${name} subscription`,
        order_id: data.id,
        notes: {
          base_price: amount * 100,
          gst: (amount * 18) / 100,
          service_charge: "12",
        },
        handler: async function (response: any) {
          // Verify payment on the server
          try {
            const verifyResponse = await api.post("/payment/verify-payment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planType: name,
              expiryDays,
            });
            if (verifyResponse.status === 200) {
              console.log("Payment Verified", response);
              router.push("/pricing?status=success");
            } else {
              console.log("Payment Verification Failed", response);
            }
          } catch (error) {
            console.log("Payment Verification Failed", error);
          }
        },
        prefill: {
          name: userInfo?.name,
          email: userInfo?.email,
          contact: userInfo?.phone,
        },
        theme: {
          color: "#525599",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("Payment Failed", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div
      className={`${className}  w-full  rounded-2xl font-bold mt-10 text-center`}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <button
        className={`w-full h-full  px-5 py-5 ${
          inUse ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isProcessing || inUse}
        onClick={handelPayment}
      >
        {isProcessing
          ? "Processing..."
          : inUse
          ? "Currently in Use"
          : `Start Using ${name}`}
      </button>
    </div>
  );
};

export default PaymentPage;
