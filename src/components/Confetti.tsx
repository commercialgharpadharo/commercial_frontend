"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";
import { useRouter } from "next/navigation";

const ConfettiBoom = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
        router.push("/owner-dashboard");
    }, 5000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-screen h-screen flex justify-center items-center backdrop-blur-lg z-[999]">
      <div className=" bg-white text-black px-20 py-20 rounded-2xl shadow-2xl flex flex-col justify-center items-center mt-14 gap-3">
        <Image
          alt="payment"
          width={300}
          height={300}
          src={"/assets/illustraion/confirmed.svg"}
        />
        <h2 className="text-3xl font-bold">
          Your Payment is <span className="text-primary">Successfull</span>
        </h2>
        <p className="text-sm text-netural">
          Thank you for your payment. Now you can use your plan and <br />
          rent your rooms on our platoform .
        </p>
        <p className="text-sm text-netural">
          Redirecting you to dashboard in {seconds} seconds...
        </p>
      </div>
      <Confetti
        mode="boom"
        particleCount={100}
        colors={[
          "#ff577f",
          "#ff884b",
          "#525599",
          "#ffb400",
          "#2d2f42",
          "#f7f7f7",
        ]}
        effectCount={5}
        shapeSize={20}
        x={0.7}
        deg={-120}
      />
      <Confetti
        mode="boom"
        particleCount={100}
        colors={["#ff577f", "#ff884b"]}
        effectCount={5}
        shapeSize={20}
        x={0.3}
        deg={-60}
      />
    </div>
  );
};

export default ConfettiBoom;
