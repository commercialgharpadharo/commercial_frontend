"use client";

import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import amenities from "@/utils/amenities";
import Link from "next/link";
import {
  CheckBadgeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

export default function PropertyCard({
  property,
  admin,
  handleDelete,
}: {
  property: Property;
  admin: boolean;
  handleDelete: (id: string, name: string) => void;
}) {
  const handleUpdate = () => {
    // Implement update functionality
  };

  return (
    <div className="lg:w-[400px] lg:h-full rounded-xl shadow-xl hover:shadow-2xl p-3 overflow-hidden bg-white group transition-all scale-95 static">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          width={1000}
          height={1000}
          src={property?.images[0] ?? "/image.jpg"}
          alt={property?.name ?? "Property Image"}
          className="w-full h-60 object-cover group-hover:scale-105 transition-all duration-300"
        />
        <div className="flex justify-end gap-2  absolute top-3 right-3">
          <Link
            href={
              admin
                ? `/admin-dashboard/properties/edit-property/${property.slug}`
                : `/owner-dashboard/properties/edit-property/${property.slug}`
            }
            onClick={handleUpdate}
            className=" bg-white/20 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-all"
          >
            <PencilIcon className="w-5" />
          </Link>
          <button
            onClick={() => {
              handleDelete(property.slug, property.name);
            }}
            className=" bg-white/20 text-white backdrop-blur px-2 py-1 rounded-md hover:bg-red-600 transition-all"
          >
            <TrashIcon className="w-5" />
          </button>
        </div>
        <div className="absolute bottom-2 left-3 z-20 text-white font-bold text-lg backdrop-blur px-2 py-1 rounded shadow">
          ₹{property?.rent}
          <span className="text-sm text-gray-300 font-normal ml-1">/month</span>
        </div>
        <div className="absolute bottom-2 right-3 z-20"></div>
      </div>

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
    </div>
  );
}
