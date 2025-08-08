"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  AdjustmentsHorizontalIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import { isAvaliableFor, propertyType, indipendent } from "@/utils/dataSets";

export default function PropertySearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [availableFor, setAvailableFor] = useState("");
  const [independent, setIndependent] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (keyword) query.append("keyword", keyword);
    if (type) query.append("type", type);
    if (availableFor) query.append("availableFor", availableFor);
    if (independent) query.append("independent", independent);

    router.push(`/properties?${query.toString()}`);
  };

  return (
    <div className="p-6 rounded-xl shadow-xl w-full lg:w-[450px] z-40 py-12 text-netural relative overflow-hidden bg-white">
      <Image
        alt="illustration"
        fill
        src="/assets/illustraion/blob-scene-haikei.svg"
        className="-z-10 object-cover"
      />

      <div className="flex space-x-2">
        <button className="px-4 py-2 rounded-t-lg font-semibold bg-netural text-white">
          For Commercial
        </button>
      </div>

      <div className="p-4 rounded-xl rounded-tl-none shadow-lg bg-white">
        <h2 className="text-2xl font-bold">Accessible Spaces for Ambitious Businesses</h2>

        <div className="mt-4 space-y-3">
          {/* Keyword input */}
          <div className="relative flex gap-2 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center p-2 w-10 h-10 rounded-2xl shadow-xl bg-buttons text-white lg:hidden"
            >
              <AdjustmentsHorizontalIcon className="w-5" />
            </button>
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500 hidden lg:block" />
              <input
                type="text"
                placeholder="Search by name, location, etc."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-3 lg:pl-10 rounded-lg border border-gray-300 focus:outline-primary"
              />
              <div className="w-10 h-10 rounded-full bg-gray-200 absolute right-1 top-1 flex items-center justify-center lg:hidden" onClick={handleSearch}>
                <MagnifyingGlassIcon className=" right-3 top-4 w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Collapsible Filter Section */}
          <div
            className={`${
              isOpen ? "max-h-[1000px]" : "max-h-0 lg:max-h-[1000px]"
            } overflow-hidden transition-all duration-700 ease-in-out flex flex-col space-y-3 lg:h-full`}
          >
            {/* Property Type */}
            <div className="relative">
              <HomeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-primary"
              >
                <option value="">Select Property Type</option>
                {propertyType.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Available For */}
            <div className="relative">
              <BuildingOffice2Icon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <select
                value={availableFor}
                onChange={(e) => setAvailableFor(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-primary"
              >
                <option value="">Available For</option>
                {isAvaliableFor.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Independent Type */}
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <select
                value={independent}
                onChange={(e) => setIndependent(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-primary"
              >
                <option value="">Independent Type</option>
                {indipendent.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
