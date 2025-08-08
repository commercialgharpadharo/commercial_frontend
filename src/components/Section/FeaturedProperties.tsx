"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../Property/PropertyCard";
import PropertyCardSkeleton from "../Property/PropertyCardSkeleton";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function PropertiesPage() {
  const [roomType, setRoomType] = useState("All");
  const [properties, setProperties] = useState<Property[] | null>(null);
  const settings = {
    style: { margin: "10px 10px" },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getData = async () => {
    setProperties(null);
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/room/featured-rooms/${roomType.toUpperCase()}`,
      { withCredentials: true }
    );
    setProperties(response.data);
  };

  useEffect(() => {
    getData();
  }, [roomType]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col p-3 lg:p-36 w-screen min-h-screen pt-20"
    >
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <motion.h2 className="text-4xl lg:text-5xl font-bold text-neutral z-10 lg:leading-14">
            Discover Latest Commercial <br />
            Properties
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "9rem" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-buttons h-[2.5px] z-0 mt-2"
          ></motion.div>
        </motion.div>

        {/* Filter Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex space-x-3"
        >
          {["All", "Shop", "Office Space", "Retail Space"].map((type) => (
            <motion.button
              key={type}
              onClick={(e) => {
                e.preventDefault();
                setRoomType(type);
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`py-2 px-5 font-medium rounded-full text-sm shadow ${
                roomType === type ? "bg-buttons text-white" : "bg-white"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </motion.form>
      </div>

      {/* Render Property Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hidden lg:grid grid-cols-3 gap-4 mt-5 place-items-center"
      >
        <AnimatePresence mode="wait">
          {properties ? (
            properties.length > 0 ? (
              properties.map((property, index) => (
                <motion.div
                  className="w-full"
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center w-full h-[50vh] col-span-3 gap-5"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Image
                    src="/assets/illustraion/home-search.svg"
                    alt="No properties found"
                    width={250}
                    height={250}
                  />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-bold"
                >
                  Oops No Properties Found
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-center text-gray-600"
                >
                  Currently there are no properties available in{" "}
                  <span className="font-bold">{roomType}</span> category. Try
                  searching with different filters.
                </motion.p>
              </motion.div>
            )
          ) : (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <PropertyCardSkeleton />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-5 lg:hidden"
      >
        {properties && properties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-[50vh] col-span-3 gap-5"
          >
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src="/assets/illustraion/home-search.svg"
                alt="No properties found"
                width={250}
                height={250}
              />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold"
            >
              Oops No Properties Found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-center text-gray-600"
            >
              Currently there are no properties available in{" "}
              <span className="font-bold">{roomType}</span> category. Try
              searching with different filters.
            </motion.p>
          </motion.div>
        )}
        <Slider {...settings}>
          {properties
            ? properties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <PropertyCardSkeleton />
                </motion.div>
              ))}
        </Slider>
      </motion.div>
    </motion.div>
  );
}
