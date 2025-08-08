// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import Script from "next/script";
// import api from "@/utils/axiosInstace";
// // import { useRouter } from "next/navigation";
// import { CreditCardIcon } from "@heroicons/react/20/solid";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }
// const PaymentPage = ({
//   seekerInfo,
//   roomId,
//   propertyName,
//   ownerId,
//   price,
// }: {
//   seekerInfo: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   ownerId: string;
//   roomId: string;
//   propertyName: string;
//   price: number;
// }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   //   const router = useRouter();
//   const router = useRouter();

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const response = await api.post("/payment/create-room-order", {
//         amount: price,
//         room: roomId,
//         ownerId: ownerId,
//       });
//       if (response.status === 401) {
//         toast.error("Session expired, please login again");
//         return;
//       }
//       const data = response.data;
//       console.log("order id" + { ...data });

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
//         amount: price * 100 * 0.18 * 0.2, // Razorpay expects amount in paise
//         currency: "INR",
//         name: "GharPadharo",
//         description: `Payment for ${propertyName}`,
//         order_id: data.id,
//         notes: {
//           base_price: (price * 100) / 1.18,
//           gst: (price * 18) / 100,
//           service_charge: "20",
//         },
//         handler: async function (response: any) {
//           console.log(response);
//           try {
//             const verifyResponse = await api.post(
//               "/payment/verify-room-order",
//               {
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//                 roomId,
//               }
//             );

//             if (verifyResponse.status === 200) {
//               console.log("Payment Verified", response);
//               router.refresh();
//             } else {
//               console.log("Payment Verification Failed", response);
//             }
//           } catch (error) {
//             console.error("Payment Verification Error:", error);
//           }
//         },
//         prefill: {
//           name: seekerInfo.name,
//           email: seekerInfo.email,
//           contact: seekerInfo.phone,
//         },
//         theme: {
//           color: "#1563df",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment Failed:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className={` w-full rounded-2xl font-bold mt-10 text-center`}>
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//       <button
//         className="flex justify-center items-center rounded-full w-full p-4 border bg-[#1563df] text-white text-center font-medium cursor-pointer"
//         disabled={isProcessing}
//         onClick={handlePayment}
//       >
//         <CreditCardIcon
//           className={`w-5 h-5 mr-2 ${
//             isProcessing ? "animate-spin" : "animate-none"
//           }`}
//         />
//         {isProcessing ? "Processing..." : `Get Owner Details`}
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Script from "next/script";
import api from "@/utils/axiosInstace";
import { CreditCardIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = ({
  seekerInfo,
  roomId,
  propertyName,
  ownerId,
  price,
}: {
  seekerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  ownerId: string;
  roomId: string;
  propertyName: string;
  price: number;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [finalAmount, setFinalAmount] = useState(price);
  const router = useRouter();

  const validateCoupon = (code: string) => {
    const normalized = code.trim().toLowerCase();
    if (normalized === "rakhii20") return 20;
    if (normalized === "independence30") return 30;
    return 0;
  };

  const applyCoupon = () => {
    const discount = validateCoupon(couponCode);
    if (discount > 0) {
      setDiscountPercent(discount);
      const discounted = price - (price * discount) / 100;
      setFinalAmount(discounted);
      toast.success(`Coupon applied! You got ${discount}% off`);
    } else {
      toast.error("Invalid coupon code");
      setDiscountPercent(0);
      setFinalAmount(price);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await api.post("/payment/create-room-order", {
        amount: finalAmount,
        room: roomId,
        ownerId: ownerId,
      });

      if (response.status === 401) {
        toast.error("Session expired, please login again");
        return;
      }

      const data = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: finalAmount * 100, // in paise
        currency: "INR",
        name: "GharPadharo",
        description: `Payment for ${propertyName}`,
        order_id: data.id,
        notes: {
          base_price: price * 100,
          discount_percent: discountPercent,
          final_amount: finalAmount * 100,
          gst: ((finalAmount * 18) / 100).toFixed(2),
          service_charge: "20",
        },
        handler: async function (response: any) {
          try {
            const verifyResponse = await api.post(
              "/payment/verify-room-order",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                roomId,
              }
            );

            if (verifyResponse.status === 200) {
              toast.success("Payment successful");
              router.refresh();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment Verification Error:", error);
            toast.error("An error occurred while verifying payment");
          }
        },
        prefill: {
          name: seekerInfo.name,
          email: seekerInfo.email,
          contact: seekerInfo.phone,
        },
        theme: {
          color: "#1563df",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Failed:", error);
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full rounded-2xl font-bold mt-10 text-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="p-2 w-full border rounded text-black"
        />
        <button
          onClick={applyCoupon}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Apply Coupon
        </button>
      </div>

      <p className="mb-2 text-lg">
        {discountPercent > 0 ? (
          <>
            <span className="line-through text-gray-500 mr-2">₹{price}</span>
            <span className="text-green-600">
              ₹{finalAmount.toFixed(2)} ({discountPercent}% OFF)
            </span>
          </>
        ) : (
          <span>₹{price}</span>
        )}
      </p>

      <button
        className="flex justify-center items-center rounded-full w-full p-4 border bg-[#1563df] text-white font-medium cursor-pointer"
        disabled={isProcessing}
        onClick={handlePayment}
      >
        <CreditCardIcon
          className={`w-5 h-5 mr-2 ${
            isProcessing ? "animate-spin" : "animate-none"
          }`}
        />
        {isProcessing ? "Processing..." : "Get Owner Details"}
      </button>
    </div>
  );
};

export default PaymentPage;

