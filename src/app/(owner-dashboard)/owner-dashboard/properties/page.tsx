"use client";

import PropertyCard from "@/components/Property/AdminPropertyCard";
import PropertyCardSkeleton from "@/components/Property/PropertyCardSkeleton";
import api from "@/utils/axiosInstace";
import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Properties = () => {
  const [postStatus, setPostStatus] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [rooms, setRooms] = useState<null | []>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<null | string>(null);
  const [property, setProperty] = useState<{ name: string } | null>(null);

  const handleDelete = (id: string, name: string) => {
    setShowConfirmation(true);
    setDeleteId(id);
    setProperty({ name });
  };
  const handleConfirmDelete = async () => {
    try {
      const resp = await api.delete(`/room/delete-room/${deleteId}`);
      if (resp.status === 200) {
        setShowConfirmation(false);
        setDeleteId(null);
        getMyProperties();
        setProperty(null);
      }
    } catch (error) {
      console.error("Could not delete property:", error);
    }
  };
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
    <div className=" p-3 lg:p-6">
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
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-sm mb-2">
                You haven&apos;t posted any properties yet.{" "}
                <Link href="/owner-dashboard/properties/new">
                  Create your first property now
                </Link>
              </p>
            </div>
          ) : (
            rooms.map((property, index) => {
              return (
                <PropertyCard
                  key={index}
                  property={property}
                  admin={false}
                  handleDelete={handleDelete}
                />
              );
            })
          )
        ) : (
          <PropertyCardSkeleton />
        )}
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl w-[320px] text-center">
            {/* Warning Icon */}
            <div className="text-red-500 mb-4 flex justify-center items-center">
              <ExclamationTriangleIcon className="w-16" />
            </div>

            {/* Title & Message */}
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Delete Project
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              You’re going to delete the “{property?.name}” property. Are you
              sure?
            </p>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                No, Keep It.
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-full hover:bg-red-600 cursor-pointer"
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
