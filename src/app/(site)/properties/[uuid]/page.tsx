/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import RaiseRefund from "@/components/Buttons/RaiseRefund";
import PropertyCard from "@/components/Property/PropertyCard";
import PropertyCardSkeleton from "@/components/Property/PropertyCardSkeleton";
import SeekerPaymentRecepit from "@/components/SeekerPaymentRecepit";
import amenities from "@/utils/amenities";
import { trackPropertyView } from "@/utils/facebook";
import { getFeaturedRooms, getRoomDetails } from "@/utils/room";
import { getUser } from "@/utils/user";
import {
  EnvelopeIcon,
  HeartIcon,
  LockClosedIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptRefundIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface MatchedAmenity {
  id: string;
  name: string;
  icon: string;
}

const Page = ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = use(params);
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [featuredRooms, setFeaturedRooms] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const roomData = await getRoomDetails({ uuid });
        const userData = await getUser();
        setData(roomData ?? null);
        setUser(userData ?? null);
        setFeaturedRooms(await getFeaturedRooms("ALL"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [uuid]);

  const nearby = JSON.parse(data?.nearbyPlaces || "[]");

  function capitalize(str = "") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    if (data) {
      trackPropertyView(data);
    }
  }, [data]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="w-screen min-h-screen pt-30 pb-10 lg:px-30 p-3 flex flex-col space-y-10"
    >
      <Head>
        <title>{data?.name || "Property Details"}</title>
        <meta
          name="description"
          content={`Explore ${data?.name || "this property"} on Gharpadharo. View details, pricing, availability, amenities, images, and more.`}
        />
        <meta property="og:title" content={data?.name || "Property Details"} />
        <meta
          property="og:description"
          content={`Explore ${data?.name || "this property"} on Gharpadharo. View details, pricing, availability, amenities, images, and more.`}
        />
        {data?.images && data.images[0] && (
          <meta property="og:image" content={data.images[0]} />
        )}
      </Head>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-50 p-10"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg p-4 w-full h-[90%] relative mt-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={previewImage || ""}
                alt="Preview"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer shadow-md"
              >
                <XMarkIcon
                  className="w-7 h-7 text-gray-700"
                  onClick={() => setShowPreview(false)}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col space-y-10"
        >
          {/* Skeleton for image gallery */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-4 h-[500px]"
          >
            {/* Main image skeleton */}
            <div className="relative w-full h-full col-span-1 rounded-xl overflow-hidden bg-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75z"
                  />
                </svg>
              </div>
            </div>

            {/* Gallery grid skeleton */}
            <div className="grid grid-cols-2 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="rounded-xl bg-gray-200 animate-pulse h-full w-full"
                  />
                ))}
            </div>
          </motion.div>

          {/* Content skeleton */}
          <div className="flex flex-col lg:flex-row justify-between w-full gap-8">
            {/* Left column */}
            <div className="flex flex-col gap-5 lg:w-2/3">
              {/* Property details skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-full bg-white shadow-md p-5 rounded-xl"
              >
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">
                  <div className="h-8 bg-gray-200 rounded-lg w-3/5 animate-pulse mb-4 lg:mb-0"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
                </div>
                <hr />
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 my-5">
                  <div className="h-6 bg-gray-200 rounded-lg w-1/4 animate-pulse mb-2"></div>
                  <div className="flex space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="h-6 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </motion.div>

              {/* Amenities skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="w-full bg-white shadow-md p-5 rounded-xl"
              >
                <div className="h-6 bg-gray-200 rounded-lg w-1/3 animate-pulse mb-5"></div>
                <div className="flex flex-wrap gap-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded-lg w-16 animate-pulse"></div>
                      </div>
                    ))}
                </div>
              </motion.div>

              {/* What's nearby skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="w-full bg-white shadow-md p-5 rounded-xl"
              >
                <div className="h-6 bg-gray-200 rounded-lg w-1/3 animate-pulse mb-3"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex space-x-4 overflow-x-auto">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="min-w-[250px] bg-gray-200 h-32 rounded-lg animate-pulse"
                        ></div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column - Owner card skeleton */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="relative w-full lg:w-96 mt-5 lg:mt-0"
            >
              <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-5">
                <div className="h-6 bg-gray-200 rounded-lg w-2/3 animate-pulse mb-3"></div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-12 bg-gray-200 rounded-full w-full animate-pulse"
                      ></div>
                    ))}

                  <div className="h-12 bg-gray-200 rounded-full w-full animate-pulse"></div>
                  <div className="h-12 bg-blue-100 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Featured properties skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex flex-col gap-5 mt-6"
          >
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden h-80 animate-pulse"
                  >
                    <div className="h-1/2 bg-gray-200 w-full"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                      <div className="flex justify-between pt-2">
                        <div className="h-5 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
                      </div>
                      <div className="flex space-x-2 pt-3">
                        <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <>
          {/* Property Images - Replace the grid with a carousel */}
          <motion.div
            variants={slideUp}
            className="h-[500px] overflow-hidden rounded-xl shadow-xl relative"
          >
            {/* Main Carousel */}
            <div className="relative w-full h-full">
              {data?.images && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full"
                >
                  <Carousel
                    autoPlay
                    infiniteLoop
                    interval={3000}
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={true}
                    className="w-full h-full"
                  >
                    {data?.images.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        className="relative w-full h-[500px] cursor-pointer"
                        onClick={() => {
                          setPreviewImage(image);
                          setShowPreview(true);
                        }}
                      >
                        <Image
                          src={image || "/placeholder-image.jpg"}
                          alt={`Property image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          priority={index === 0}
                          className="w-full h-full"
                        />
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                          {index + 1}/{data?.images.length}
                        </div>
                      </motion.div>
                    ))}
                  </Carousel>
                </motion.div>
              )}

              {/* Controls overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/70 rounded-full p-2 shadow-md cursor-pointer"
                  onClick={() => {
                    // Access the carousel ref to go to previous slide
                    if (document.querySelector(".carousel .control-prev")) {
                      (
                        document.querySelector(".carousel .control-prev") as HTMLElement
                      )?.click();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/70 rounded-full p-2 shadow-md cursor-pointer"
                  onClick={() => {
                    // Access the carousel ref to go to next slide
                    if (document.querySelector(".carousel .control-next")) {
                      (
                        document.querySelector(".carousel .control-next") as HTMLElement
                      )?.click();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Expand button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 bg-white/70 rounded-full p-2 shadow-md cursor-pointer"
                onClick={() => {
                  if (data?.images && data.images.length > 0) {
                    setPreviewImage(data.images[0]);
                    setShowPreview(true);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Property Details */}
          <div className="flex flex-col lg:flex-row justify-between w-full">
            {/* Left Column */}
            <motion.div
              variants={slideUp}
              className="flex flex-col gap-5 lg:w-2/3"
            >
              {/* Main Info */}
              <motion.div
                variants={fadeIn}
                className="w-full bg-white shadow-md p-5 rounded-xl flex flex-col gap-5"
              >
                {/* Name And rent */}
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:text-4xl text-2xl font-bold"
                  >
                    {data?.name}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl lg:text-3xl font-semibold"
                  >
                    <span>₹{data?.rent}</span>
                    <span className="text-lg lg:text-2xl">/month</span>
                  </motion.div>
                </div>
                <hr />
                {/* Address and actions */}
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center gap-3 lg:gap-0">
                  <div className="flex flex-col gap-2">
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {data?.type}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2"
                    >
                      <MapPinIcon className="w-6 h-6 text-gray-500" />
                      <p className="text-sm text-gray-500">{data?.displayName}</p>
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="group shadow-lg hover:bg-buttons transition-all p-2 rounded-xl"
                    >
                      <HeartIcon
                        className="w-5 h-5 text-gray-500 cursor-pointer group-hover:text-white transition-all"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="group shadow-lg hover:bg-buttons transition-all p-2 rounded-xl"
                      onClick={handleShare}
                    >
                      <ShareIcon className="w-5 h-5 text-gray-500 cursor-pointer group-hover:text-white transition-all" />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  variants={slideUp}
                  className="flex flex-col gap-3"
                >
                  <h2 className="text-lg font-semibold">Description</h2>
                  <p className="text-sm text-gray-500">{data?.description}</p>
                </motion.div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                variants={slideUp}
                className="w-full bg-white shadow-md p-5 rounded-xl flex flex-col"
              >
                <h2 className="text-lg font-semibold">Amenities and features</h2>
                <motion.div
                  variants={staggerContainer}
                  className="flex flex-wrap gap-10 mt-3 h-16"
                >
                  {data?.facilities?.map((facility: string, index: number) => {
                    const matchedAmenity: MatchedAmenity | undefined =
                      amenities.find(
                        (amenity) => amenity.id === facility.toUpperCase()
                      );
                    return (
                      <motion.div
                        key={facility}
                        variants={slideUp}
                        whileHover={{ y: -5 }}
                        title={matchedAmenity?.name}
                        className="rounded-full py-1 text-gray-600 text-sm font-medium flex items-center gap-2 h-fit"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="shadow-lg p-3 rounded-lg"
                        >
                          <Image
                            width={50}
                            height={50}
                            src={matchedAmenity?.icon || "/image.jpg"}
                            alt={matchedAmenity?.name || "/image.jpg"}
                            className="w-5 h-5"
                          />
                        </motion.div>
                        <span className="font-semibold">
                          {matchedAmenity?.name || ""}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* What's Nearby */}
              <motion.div
                variants={slideUp}
                className="w-full bg-white shadow-md p-5 rounded-xl flex flex-col gap-3"
              >
                <h2 className="text-lg font-semibold">What&apos;s nearby?</h2>
                <p className="text-sm">
                  Explore nearby amenities to precisely locate your property and
                  identify surrounding conveniences, providing a comprehensive
                  overview of the living environment and the property&apos;s
                  convenience.
                </p>
                <div className="bg-gray-100 rounded-xl p-4 mt-5">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ scrollbarWidth: "thin" }}
                    className="flex gap-4 overflow-x-auto no-scrollbar"
                  >
                    {nearby.map((place: any, index: number) => (
                      <motion.div
                        key={place.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="min-w-[250px] bg-white rounded-lg border border-gray-200 px-4 py-3 flex flex-col justify-between shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Image
                            width={50}
                            height={50}
                            src={`https://img.icons8.com/fluency/24/000000/${
                              place.type === "gym" ? "dumbbell" : place.type
                            }.png`}
                            alt={place.type}
                            className="w-5 h-5"
                          />
                          <p className="text-sm font-semibold text-gray-700">
                            {capitalize(place.type)}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 leading-tight line-clamp-2">
                          {place.name}
                        </p>

                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm font-semibold text-gray-900">
                            {place.duration}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({place.distance})
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Owner Card */}
            <motion.div
              variants={slideUp}
              className="relative w-full lg:w-96 mt-5 lg:mt-0"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-5 top-0"
              >
                <h2 className="text-lg font-medium">Property Owner Details</h2>
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full overflow-hidden"
                  >
                    <Image
                      src={data?.owner?.photo || "/placeholder-avatar.jpg"}
                      alt="Owner"
                      width={1000}
                      height={1000}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-md font-medium">{data?.owner?.name}</h3>
                    <p className="text-sm text-gray-400">{data?.primeLocation}</p>
                  </div>
                </div>
                <div id="details" className="flex flex-col gap-5">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-2 rounded-full w-full p-4 border border-gray-400 text-gray-800 text-sm `}
                  >
                    <PhoneIcon className="w-5 h-5 text-gray-500" />
                    <span
                      className={`${
                        data?.owner?.phoneNumber ? "" : "blur-sm"
                      }`}
                    >
                      {data?.owner?.phoneNumber || "+91 9411121219"}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-2 rounded-full w-full p-4 border border-gray-400 text-gray-800 text-sm `}
                  >
                    <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                    <span
                      className={`${
                        data?.owner?.phoneNumber ? "" : "blur-sm"
                      }`}
                    >
                      {data?.owner?.email || "contact@gharpadharo.com"}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-2 rounded-full w-full p-4 border border-gray-400 text-gray-800 text-sm`}
                  >
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <span
                      className={`line-clamp-1 overflow-ellipsis w-3/4 ${
                        data?.owner?.phoneNumber ? "" : "blur-sm"
                      }`}
                    >
                      {data?.googleMapsLocation || "https://maps.google.com"}
                    </span>
                  </motion.div>

                  {data?.owner?.phoneNumber ? (
                    data.payment === "COMPLETED" ? (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RaiseRefund uuid={uuid} />
                      </motion.div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        className="flex justify-center items-center rounded-full w-full p-4 border bg-[#1563df] text-white text-center font-medium cursor-not-allowed"
                      >
                        <ReceiptRefundIcon className="w-5 h-5 mr-2" />
                        Refund Raised
                      </motion.button>
                    )
                  ) : data?.numberOfRooms === 0 || !data?.availability ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="flex justify-center items-center rounded-full w-full p-4 bg-red-400 text-white text-center font-medium cursor-pointer"
                    >
                      <LockClosedIcon className="w-5 h-5 mr-2" /> Currently not
                      available
                    </motion.button>
                  ) : (
                    <div>
                      <SeekerPaymentRecepit
                        roomId={uuid}
                        seekerInfo={user}
                        propertyName={data?.name || ""}
                        ownerId={data?.owner?._id || ""}
                      />
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={"tel:+917903269007"}
                      className="flex justify-center items-center rounded-full w-full p-4 bg-buttons text-white text-center font-medium cursor-pointer"
                    >
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      Having Any Trouble? Call Us
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Properties */}
          <motion.div
            variants={slideUp}
            className="flex flex-col gap-5 mt-10"
          >
            <div className="flex flex-col gap-1">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold"
              >
                Featured Properties
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm"
              >
                Explore all the different types of properties so you can choose the
                best option for you.
              </motion.p>
            </div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full place-items-center"
            >
              {featuredRooms
                ? featuredRooms.map((property: any, index: number) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="w-full"
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <PropertyCardSkeleton key={index} />
                    </motion.div>
                  ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Page;
