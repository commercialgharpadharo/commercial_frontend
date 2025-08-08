/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ConfettiBoom from "@/components/Confetti";
import { PricingCard } from "@/components/PricingCards";
import api from "@/utils/axiosInstace";
import dynamic from "next/dynamic";
import React, { use, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import PaymentPage from "@/components/PaymentButton";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [userDetails, setUserDetails] = useState<user | null>(null);
  const getUser = async () => {
    try {
      const { data } = await api.get("/user/get-user-info", {
        withCredentials: true,
      });
      setUserDetails(data);
      return data;
    } catch (error) {
      return null;
    }
  };
  const { status } = use(searchParams);

  useEffect(() => {
    getUser();
  }, []);
  console.log(status);
  if (status === "success") {
    // Handle successful payment
    console.log("Payment was successful!");
    // You can trigger database updates or show success messages
  }

  const planLevels: Record<string, number> = {
    FREE: 0,
    PRO: 1,
    PREMIUM: 2,
  };

  const plans = [
    {
      name: "FREE",
      price: 0,
      validity: 10,
      numberOfRooms: 1,
      features: [
        { name: "Account creation", available: true },
        { name: "1 room free listing", available: true },
        { name: "10 days validity", available: true },
        { name: "Verified Owner Badge", available: false },
        { name: "Multiple address", available: false },
        { name: "Top position in search list", available: false }, // From Pro
        { name: "Priority Support", available: false },
        { name: "Commission-Free Payments", available: false },
        { name: "Early Access to New Features", available: false },
      ],
      popular: false,
      className: "bg-white text-black scale",
      buttonClass: "bg-blue-400 text-white",
    },
    {
      name: "PRO",
      price:999,
      validity: 90,
      numberOfRooms: 10,

      features: [
        { name: "Account creation", available: true },
        { name: "10 room free listing", available: true },
        { name: "90 days validity", available: true },
        { name: "Verified Owner Badge", available: true },
        { name: "Single address", available: true }, // From Premium
        { name: "Top position in search list for 2 days", available: true },
        { name: "Priority Support", available: true },
        { name: "Commission-Free Payments", available: true },
        { name: "Early Access to New Features", available: false },
      ],
      popular: false,
      className: "bg-blue-400 text-white",
      buttonClass: "bg-white text-black",
    },
    {
      name: "PREMIUM",
      price: 1499,
      validity: 180,
      numberOfRooms: "999",
      features: [
        { name: "Account creation", available: true },
        { name: "Unlimited listing", available: true },
        { name: "180 days validity", available: true },
        { name: "Verified Owner Badge", available: true },
        { name: "Multiple address", available: true },
        { name: "Top position in search list for 10 days", available: true },
        { name: "Priority Support", available: true },
        { name: "Commission-Free Payments", available: true },
        { name: "Early Access to New Features", available: true },
        { name: "Guaranteed Tenants Leads", available: true },
        { name: "Run Meta Ad Of Your Property  ", available: true },
        { name: "Photoshoot with host", available: false },
      ],
      popular: true,
      className: "bg-white text-black",
      buttonClass: "bg-blue-400 text-white",
    },
  ];

  const currentUserPlan = userDetails ? userDetails.planType : null;
  const router = useRouter();
  const [showBilling, setShowBilling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    expiryDays: number;
  } | null>(null);

  const handleUpgradeClick = (plan: {
    name: string;
    price: number;
    expiryDays: number;
  }) => {
    if (plan.price === 0) {
      api
        .put("/user/update-user-plan", {
          planType: plan.name,
          expiryDays: plan.expiryDays,
        })
        .then(() => {
          router.push("/pricing?status=success");
        });
    } else {
      setSelectedPlan(plan);
      setShowBilling(true);
    }
  };

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };
  return (
    <div className="lg:px-20 px-5 py-32 flex flex-col justify-center items-center w-full min-h-screen gap-5 relative">
      {status && <ConfettiBoom />}
      <h1 className="font-bold text-2xl lg:text-5xl text-center">
        We&apos;ve got a pricing plan <br /> that&apos;s perfect for you
      </h1>
      <p className="text-center text-sm lg:text-base font-medium text-gray-400">
        Cost-Effective, Full Service, Fully Secure
      </p>
      {currentUserPlan ? (
        <div className="text-center mt-5">
          <span className="text-lg font-semibold">
            {userDetails?.userType === "owner"
              ? `You are currently on the ${currentUserPlan} plan.`
              : "This pricing information is for owners only."}
          </span>
        </div>
      ) : (
        <div className="text-center mt-5">
          <span className="text-lg font-semibold">
            This pricing information is for owners only.
          </span>
        </div>
      )}
      <div className="lg:grid grid-cols-3 gap-10 mt-20 hidden">
        {plans.map((plan) => {
          const isCurrentPlan = currentUserPlan === plan.name;
          const userPlanLevel = currentUserPlan
            ? planLevels[currentUserPlan]
            : -1;
          const thisPlanLevel = planLevels[plan.name];
          const isDowngrade = userPlanLevel > thisPlanLevel;

          return (
            <PricingCard
              onUpgradeClick={handleUpgradeClick}
              expiryDays={plan.validity}
              userDetails={userDetails}
              key={plan.name}
              {...plan}
              inUse={isCurrentPlan}
              canDowngrade={!isDowngrade}
            />
          );
        })}
      </div>
      <div className="max-w-screen max-h-screen px-3 static lg:hidden">
        <Slider className="" {...settings}>
          {plans.map((plan) => {
            const isCurrentPlan = currentUserPlan === plan.name;
            const userPlanLevel = currentUserPlan
              ? planLevels[currentUserPlan]
              : -1;
            const thisPlanLevel = planLevels[plan.name];
            const isDowngrade = userPlanLevel > thisPlanLevel;

            return (
              <PricingCard
                onUpgradeClick={handleUpgradeClick}
                expiryDays={plan.validity}
                userDetails={userDetails}
                key={plan.name}
                {...plan}
                inUse={isCurrentPlan}
                canDowngrade={!isDowngrade}
              />
            );
          })}
        </Slider>
      </div>
      {showBilling && selectedPlan && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-black">
            <h3 className="text-xl font-bold mb-4">Billing Summary</h3>
            <ul className="mb-4 text-sm">
              <li className="flex justify-between">
                <span>Base Amount</span> <span>₹{selectedPlan.price}</span>
              </li>
              <li className="flex justify-between">
                <span>GST (18%)</span>{" "}
                <span>₹{(selectedPlan.price * 0.18).toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Platform Fee</span> <span>₹12</span>
              </li>
              <hr className="my-2" />
              <li className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  ₹
                  {(
                    selectedPlan.price +
                    selectedPlan.price * 0.18 +
                    12
                  ).toFixed(2)}
                </span>
              </li>
            </ul>
            <PaymentPage
              expiryDays={selectedPlan.expiryDays}
              userInfo={userDetails}
              name={selectedPlan.name}
              amount={Math.round(
                selectedPlan.price + selectedPlan.price * 0.18 + 12
              )}
              className="bg-blue-500 text-white w-full rounded-md py-2 mt-2"
              inUse={false}
            />
            <button
              className="mt-2 text-gray-600 underline text-sm w-full cursor-pointer"
              onClick={() => setShowBilling(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
