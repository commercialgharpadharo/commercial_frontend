"use client";
import api from "@/utils/axiosInstace";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type UserType = "owner" | "seeker" | null;

interface UserDetailsFormProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<UserDetailsFormProps["userData"]>
  >;
  userType: UserType;
  onBack: () => void;
  onSubmit: () => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  userData,
  setUserData,
  userType,
  onBack,
  onSubmit,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConfirmed) {
      toast.error("Please confirm that your details are correct.");
      return;
    }
    onSubmit();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Remove token from URL and refresh the window
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.location.href = url.toString();

    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Update Your Details
      </h1>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Please provide your details to continue as a
        <span className="font-semibold text-blue-600">
          {" "}
          {userType === "owner" ? "Room Owner" : "Room Seeker"}
        </span>
        .
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          required
          disabled
        />
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          required
        />
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="confirmation"
            checked={isConfirmed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
          />
          <label htmlFor="confirmation" className="text-gray-600 text-sm">
            I confirm that I have rechecked my details and they are correct.
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Save Details
        </button>
      </form>
      <p className="text-red-600 text-sm text-center mt-4 font-semibold">
        <span role="img" aria-label="warning">
          ⚠️
        </span>
        Note: Please double-check your details before submitting. If you need to
        update your details in the future, please contact the{" "}
        <Link href={"mailto:contact@gharpadharo.com"}>admin</Link>.
      </p>
      <button
        onClick={onBack}
        className="mt-6 text-blue-600 font-semibold hover:underline"
      >
        ← Go Back
      </button>
    </div>
  );
};

const UserSelection = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userData, setUserData] = useState<UserDetailsFormProps["userData"]>({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await api.get("/user/get-user-info");
        console.log(data);
        if (data.isProfileComplete === true) return router.push("/");
        setUserData({ name: data.name, email: data.email, phone: data.phone });
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const handleUserTypeSelect = (type: UserType) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      pending: "Processing your selection...",
      success: `You selected ${
        type === "owner" ? "Room Owner" : "Room Seeker"
      }`,
      error: "Something went wrong! Try again.",
    });
    setTimeout(() => {
      setUserType(type);
      setStep(2);
    }, 1000);
  };

  const handleSubmit = async () => {
    try {
      const response = await toast.promise(
        api.put("/user/update-user-info", { ...userData, userType }),
        {
          pending: "Saving your details...",
          success: "Your details have been saved!",
        }
      );
      if (response.status === 200) {
        router.push("/");
      } else if (response.status === 400) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      const { response } = error as { response: { data: { message: string } } };
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/50 fixed top-0 left-0 z-50">
      {step === 1 ? (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Who Are You?
          </h1>
          <p className="text-gray-500 text-center mb-6 text-sm">
            Choose whether you are looking for a room or listing one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div
              className="cursor-pointer p-6 border rounded-lg shadow-md hover:shadow-xl transition relative flex flex-col items-center bg-blue-100"
              onClick={() => handleUserTypeSelect("owner")}
            >
              <Image
                src="/assets/owner.png"
                alt="Room Owner"
                width={100}
                height={100}
                className="mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                I am a Room Owner
              </h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                List your property and connect with seekers.
              </p>
            </div>
            <div
              className="cursor-pointer p-6 border rounded-lg shadow-md hover:shadow-xl transition relative flex flex-col items-center bg-green-100"
              onClick={() => handleUserTypeSelect("seeker")}
            >
              <Image
                src="/assets/seeker.png"
                alt="Room Seeker"
                width={100}
                height={100}
                className="mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                I am a Room Seeker
              </h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                Find the perfect room for your needs.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <UserDetailsForm
          userData={userData}
          setUserData={setUserData}
          userType={userType}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UserSelection;
