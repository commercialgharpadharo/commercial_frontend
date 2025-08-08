"use client";
import Image from "next/image";
import React from "react";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { useLogin } from "../context/LoginContext";
import { XMarkIcon } from "@heroicons/react/20/solid";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const LoginCard = () => {
  const { isLoginOpen, setIsLoginOpen } = useLogin();

  if (!isLoginOpen) return null; // Hide when not needed

  const googleAuth = () => {
    window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`, "_self");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/50 fixed top-0 z-50 p-5 lg:p-0">
      <div className="flex bg-white shadow-lg p-6 rounded-xl w-full max-w-4xl h-[400px] lg:h-[500px] relative">
        <XMarkIcon
          onClick={() => setIsLoginOpen(false)}
          className="absolute top-4 right-4 w-8 cursor-pointer"
        />
        {/* Left Side - Image */}
        <div className="hidden md:flex items-center justify-center w-1/2">
          <Image
            src="/assets/signin.svg" // Replace with your actual image path
            alt="Login"
            width={1000}
            height={1000}
            className="rounded-lg"
          />
        </div>

        {/* Right Side - Login Content */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-6">
          <h1 className={`${pacifico.className} text-4xl text-gray-800 mb-2`}>
            Welcome
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Find your perfect stay or list your space for rent effortlessly.
            <br />
            Sign in to explore the best rental options near you!
          </p>

          <button
            onClick={googleAuth}
            className="flex items-center justify-center gap-2 w-64 py-3 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
            >
              <path
                fill="#EA4335"
                d="M24 20v8h11c-.5 2.9-3.4 8-11 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.7 1.1 7.8 3l5.6-5.6C34.6 5.1 29.7 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.6 0 20-7.7 20-21 0-1.4-.2-2.7-.4-4H24z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            By signing in, you agree to our
            <Link href="#" className="text-blue-500 hover:underline">
              {" "}
              Terms of Service{" "}
            </Link>
            and
            <br />
            <Link href="#" className="text-blue-500 hover:underline">
              {" "}
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
