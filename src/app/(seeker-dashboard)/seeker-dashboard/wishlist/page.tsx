'use client'
import PropertyCard from "@/components/Property/PropertyCard";
import PropertyCardSkeleton from "@/components/Property/PropertyCardSkeleton"; 
import { getFavRooms } from "@/utils/room";
import { useState, useEffect } from "react";

const Page = () => {
  const [favouriteRooms, setFavouriteRooms] = useState<Property[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getFavRooms();
      setFavouriteRooms(data?.favouriteRooms || []);
    })();
  }, []);

  return (
    <div className="pt-20 p-2 lg:p-6 flex flex-col gap-5 ">
      <h2 className="text-2xl font-semibold">Favourite Properties</h2>

      <div className="flex gap-5 flex-wrap">
        {favouriteRooms === null ? (
          Array(3).fill(null).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : favouriteRooms.length > 0 ? (
          favouriteRooms.map((room) => (
            <PropertyCard property={room} key={room._id} />
          ))
        ) : (
          <p>No favourite properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;

