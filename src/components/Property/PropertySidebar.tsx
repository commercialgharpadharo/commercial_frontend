"use client";

import { useCallback, useEffect, useState } from "react";
import MultiRangeSlider from "../MultirangeSlider/MultirangeSlider";
import amenities from "@/utils/amenities";
import {
  accomodations,
  furnished,
  indipendent,
  isAvaliableFor,
  propertyType,
} from "@/utils/dataSets";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
const PropertySidebar: React.FC<{
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  classname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAllRooms: () => Promise<void>;
}> = ({ filters, setFilters, classname, setIsOpen, getAllRooms }) => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 5000,
    max: 160000,
  });

  const handlePriceChange = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      setPriceRange({ min, max });
    },
    []
  );
  const router = useRouter();
  const [clearTriggered, setClearTriggered] = useState(false);

  const handleClear = () => {
    setFilters({
      search: "",
      type: "",
      accommodationType: "",
      primeLocation: "",
      independent: "",
      isAvaliableFor: "",
      furnished: "",
      rent: { min: 1000, max: 160000 },
      facilities: [],
    });
    setIsOpen(false)
    setClearTriggered(true); // 🔥 flag it
    router.push("/properties");
  };

  useEffect(() => {
    if (clearTriggered) {
      getAllRooms(); // 🧼 call only after clearing
      setClearTriggered(false); // reset the flag
    }
  }, [clearTriggered]);

  return (
    <div
      className={`bg-[#fafbfa] p-6 rounded-xl w-full lg:w-96 shadow-lg ${classname}`}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold ">Advanced Search</h2>
        <XMarkIcon
          onClick={() => {
            setIsOpen(false);
          }}
          className="w-5 lg:hidden"
        />
      </div>
      {/* Search Box */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 ml-1">Keyword</label>
        <input
          type="text"
          placeholder="Search by name, location, etc."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full border px-4 py-2 rounded-md border-gray-300 mb-4"
        />
      </div>
      {/* Accommodation Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 ml-1">Accomodation</label>
        <select
          value={filters.accommodationType}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              accommodationType: e.target.value,
            }))
          }
          className="w-full mb-3 p-2 border border-gray-300 rounded-lg bg-white text-sm"
        >
          <option value="">All</option>
          {accomodations.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {" "}
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
      {/* Prtoperty Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 ml-1">Property Type</label>
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
          className="w-full mb-3 p-2 border border-gray-300 rounded-lg bg-white text-sm"
        >
          <option value="">All</option>
          {propertyType.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {" "}
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
      {/* Available For */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 ml-1">Furnished</label>
        <select
          value={filters.furnished}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              furnished: e.target.value,
            }))
          }
          className="w-full mb-3 p-2 border border-gray-300 rounded-lg bg-white text-sm"
        >
          <option value="">All</option>
          {furnished.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {" "}
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
      {/* Furnished */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 ml-1">Independent</label>
        <select
          value={filters.independent}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              independent: e.target.value,
            }))
          }
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg bg-white text-sm"
        >
          <option value="">All</option>
          {indipendent.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {" "}
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
      {/* Avaliable for */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 ml-1">Avaliable For</label>
        <select
          value={filters.isAvaliableFor}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              isAvaliableFor: e.target.value,
            }))
          }
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg bg-white text-sm"
        >
          <option value="">All</option>
          {isAvaliableFor.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {" "}
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Price Range</label>
        <MultiRangeSlider
          min={1000}
          max={160000}
          onChange={handlePriceChange}
        />
      </div>
      {/* Amenities */}
      <div className="flex flex-col mt-10">
        <label className="block text-sm font-semibold mb-2">Amenities</label>
        <div className="grid grid-cols-2">
          {amenities.map((am) => (
            <div key={am.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.facilities.includes(am.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters((prev) => ({
                      ...prev,
                      facilities: [...prev.facilities, am.id],
                    }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      facilities: prev.facilities.filter((f) => f !== am.id),
                    }));
                  }
                }}
              />
              <span className="text-sm">{am.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 justify-between">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          onClick={async () => {
            setIsOpen(false);
            setFilters((prev) => ({ ...prev, rent: priceRange }));
            await getAllRooms();
          }}
        >
          🔍 Search
        </button>
        <button className="text-gray-500 text-sm" onClick={handleClear}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default PropertySidebar;
