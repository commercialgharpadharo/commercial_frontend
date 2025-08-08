"use client"


import PropertyCard from "@/components/Property/PropertyCard";
import PropertyCardSkeleton from "@/components/Property/PropertyCardSkeleton";
import PropertySidebar from "@/components/Property/PropertySidebar";
import api from "@/utils/axiosInstace";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import React, { Suspense, useEffect, useState } from "react";

const Page = () => {
  const [allRooms, setAllRooms] = useState<Property[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "",
    accommodationType: "",
    primeLocation: "",
    independent: "",
    isAvaliableFor: "",
    furnished: "",
    rent: { min: 0, max: 100000 },
    facilities: [],
  });

  const [fetching, setFetching] = useState(false);

  const getAllRooms = async () => {
    if (fetching) return;
    setFetching(true);

    try {
      console.log("Fetching rooms with filters:", filters);
      const response = await api.get("/room/all-rooms", { params: filters });
      if (response.status === 200) setAllRooms(response.data);
      setFetching(false);
    } catch (error) {
      console.error("API error:", error);
      setFetching(false);
      setAllRooms([]);
    }
  };

  // Load filters from URL on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      // Only update if we have search params
      if (params.toString()) {
        console.log("URL params found:", params.toString());

        const urlFilters: Filters = {
          search: params.get("search") || "",
          type: params.get("type") || "",
          accommodationType: params.get("accommodationType") || "",
          primeLocation: params.get("primeLocation") || "",
          independent: params.get("independent") || "",
          isAvaliableFor: params.get("isAvaliableFor") || "",
          furnished: params.get("furnished") || "",
          rent: {
            min: parseInt(params.get("rentMin") || "0"),
            max: parseInt(params.get("rentMax") || "100000"),
          },
          facilities: params.getAll("facilities") || [],
        };

        console.log("Setting filters from URL:", urlFilters);
        setFilters(urlFilters);
      }

      setFiltersLoaded(true);
    }
  }, []);

  // Fetch rooms every time filters change, but only after initial load
  useEffect(() => {
    if (filtersLoaded) {
      getAllRooms();
    }
  }, [filters, filtersLoaded]);

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <span className="text-lg font-medium text-gray-500">Loading...</span>
        </div>
      }
    >
      {/* Overlay for sidebar on mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[998] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto pt-32 px-2 sm:px-6 lg:px-16 pb-10 gap-10 min-h-[100vh]">
        <div
          className={`fixed inset-0 h-screen w-screen lg:static lg:h-auto lg:w-[600px] lg:max-h-full max-h-screen lg:min-h-[90vh] z-[999] lg:z-40 top-0 overflow-hidden overflow-y-auto bg-white shadow-lg border-r border-gray-100 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative lg:shadow-none lg:border-0`}
        >
          <PropertySidebar
            getAllRooms={getAllRooms}
            setIsOpen={setIsOpen}
            classname="lg:fixed top-0"
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              Property Listing
            </h2>
            <AdjustmentsHorizontalIcon
              onClick={() => setIsOpen(!isOpen)}
              className="w-7 h-7 cursor-pointer text-blue-600 lg:hidden"
              title="Show Filters"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-gray-600 font-medium">
              {allRooms?.length || 0} properties found
            </p>
            {/* Show active filters */}
            {(filters.search || filters.type || filters.primeLocation) && (
              <div className="flex flex-wrap gap-2 ml-2">
                {filters.search && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium shadow-sm">
                    Search: {filters.search}
                  </span>
                )}
                {filters.type && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium shadow-sm">
                    Type: {filters.type}
                  </span>
                )}
                {filters.primeLocation && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium shadow-sm">
                    Location: {filters.primeLocation}
                  </span>
                )}
              </div>
            )}
          </div>

          {fetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : allRooms && allRooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {allRooms.map((property, index) => (
                <PropertyCard key={property._id || index} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg shadow-inner mt-10">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  No properties found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters to find more properties.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      type: "",
                      accommodationType: "",
                      primeLocation: "",
                      independent: "",
                      isAvaliableFor: "",
                      furnished: "",
                      rent: { min: 0, max: 100000 },
                      facilities: [],
                    });
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
