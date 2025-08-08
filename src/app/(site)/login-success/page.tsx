"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token in localStorage
      localStorage.setItem("token", token);

      // Optional: redirect to dashboard or home
      router.push("/"); // Change to your desired route
    }
  }, []);

  return <div>Processing...</div>;
};

export default Page;
