"use client";

import PropertyCard from "@/components/Property/AdminPropertyCard";
import PropertyCardSkeleton from "@/components/Property/PropertyCardSkeleton";
import api from "@/utils/axiosInstace";
import Link from "next/link";
import { useEffect, useState } from "react";

const Properties = () => {
  const [postStatus, setPostStatus] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [rooms, setRooms] = useState<null | []>(null);

  const getMyProperties = async () => {
    try {
      const response = await api.get("/room/my-posted-rooms");
      if (response.status === 200) setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProperties();
  }, []);

  return (
    <div className="p-3 lg:p-6 pt-20 lg:pt-6">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-4">My Properties</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Post Status
          </label>
          <select
            className="w-full border rounded-lg p-2 mt-1"
            value={postStatus}
            onChange={(e) => setPostStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="published">Published</option>
            <option value="draft">UnPublished</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Post Title
          </label>
          <input
            type="text"
            placeholder="Search by title"
            className="w-full border rounded-lg p-2 mt-1"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
        {rooms ? (
          rooms.length === 0 ? (
            <div className="text-center">
              No properties found{" "}
              <Link className="underline" href="/admin-dashboard/properties/add-properties">
                Add one
              </Link>
            </div>
          ) : (
            rooms.map((property, index) => {
              return (
                <PropertyCard
                  handleDelete={() => {}}
                  key={index}
                  property={property}
                  admin={true}
                />
              );
            })
          )
        ) : (
          <PropertyCardSkeleton />
        )}
      </div>
    </div>
  );
};

export default Properties;
