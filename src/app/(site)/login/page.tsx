"use client";
import { useEffect } from "react";
import { useLogin } from "@/context/LoginContext";
import { useRouter } from "next/navigation";
// import api from "@/utils/axiosInstace";

const Page = () => {
  const router = useRouter();
  const redirectUrl = "/";

  const { setIsLoginOpen } = useLogin();
  // const logout = async () => {
  //   await api.get("/auth/logout");
  // };
  useEffect(() => {
    setIsLoginOpen(true);
    // logout();
    router.push(redirectUrl);
  }, [setIsLoginOpen, router, redirectUrl]);

  return null; // Avoid rendering anything
};

export default Page;
