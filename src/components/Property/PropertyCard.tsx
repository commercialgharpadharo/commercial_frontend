"use client";

import { useState } from "react";
import Image from "next/image";
import { BookmarkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import amenities from "@/utils/amenities";
import api from "@/utils/axiosInstace";
import Link from "next/link";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

export default function PropertyCard({ property }: { property: Property }) {
  const [isFavourite, setIsFavourite] = useState(property.favourite ?? false);

  const toggleFavourite = async () => {
    try {
      await api.put(`/user/favourites/${property.slug}`);
      setIsFavourite((prev) => !prev);
    } catch (error) {
      console.error("Could not toggle favourite:", error);
    }
  };

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="!lg:w-[400px] lg:h-[480px] max-w-[400px] lg:min-w-[400px] lg:max-w-[400px] rounded-xl shadow-xl hover:shadow-2xl p-3 overflow-hidden bg-white group transition-all"
    >
      {/* Image + Tags */}
      <div className="relative overflow-hidden rounded-xl">
        <Image
          width={1000}
          height={1000}
          src={property?.images[0] ?? "/image.jpg"}
          alt={property?.name ?? "Property Image"}
          className="w-full h-60 object-cover group-hover:scale-105 transition-all duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2 z-20 flex-wrap">
          {property?.featured && (
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              Featured
            </span>
          )}
          {property?.independent !== "NON_INDEPENDENT" && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              {property?.independent === "INDEPENDENT"
                ? "Independent"
                : "Semi-Independent"}
            </span>
          )}
          {property?.furnished !== "UNFURNISHED" && (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              {property?.furnished === "SEMI_FURNISHED"
                ? "Semi-Furnished"
                : "Fully-Furnished"}
            </span>
          )}
        </div>
        <div className="absolute bottom-2 left-3 z-20 text-white font-bold text-lg backdrop-blur px-2 py-1 rounded shadow">
          ₹{property?.rent}
          <span className="text-sm text-gray-300 font-normal ml-1">/month</span>
        </div>
        <div className="absolute bottom-2 right-3 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavourite();
            }}
            className={`${
              isFavourite ? "bg-yellow-500" : "bg-white/20"
            } hover:bg-yellow-500 transition-all p-2 rounded-full`}
          >
            <BookmarkIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Property Info */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold truncate">{property?.name ?? ""}</h2>
          <span className="text-sm font-medium text-gray-500">
            {property?.type}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <MapPinIcon className="w-4 h-4 text-gray-400" />
          <span className="truncate">
            {property?.displayName || property?.primeLocation || ""}
          </span>
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-3 mt-4 min-h-[70px]">
          {property?.facilities?.slice(0, 6).map((facility) => {
            const matchedAmenity = amenities.find(
              (amenity) => amenity.id === facility.toUpperCase()
            );
            return (
              <div
                key={facility}
                title={matchedAmenity?.name}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <Image
                  width={20}
                  height={20}
                  src={matchedAmenity?.icon || "/image.jpg"}
                  alt={matchedAmenity?.name || "Amenity"}
                  className="w-5 h-5"
                />
                <span className="hidden md:inline">{matchedAmenity?.name}</span>
              </div>
            );
          })}
        </div>

        {/* Owner + Post Date */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-4">
          <div className="flex items-center gap-2">
            <Image
              height={40}
              width={40}
              src={property?.owner?.photo ?? "/image.jpg"}
              alt={property?.owner?.name ?? "Owner"}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span> {property?.owner?.name ?? ""}</span>
              {property?.owner?.isVerified && (
                <CheckBadgeIcon className="w-4 text-primary" />
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Posted On{" "}
            <span className="font-normal">
              {property?.createdAt
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(property?.createdAt))
                : ""}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
