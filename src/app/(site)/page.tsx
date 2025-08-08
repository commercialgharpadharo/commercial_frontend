"use client";
import React from "react";
import Image from "next/image";
import PropertySearch from "@/components/Search";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PropertiesPage from "@/components/Section/FeaturedProperties";
import Testimonials from "@/components/Section/Testimonials";
import Link from "next/link";
import Head from "next/head";
const Page = () => {
  const chooseUs = [
    {
      label: "Easy Search",
      icon: <ArrowRightIcon className="w-5 h-5 text-primary" />,
      text: "Find your ideal room with our user-friendly search tools.",
    },
    {
      label: "Affordable Prices",
      icon: <ArrowRightIcon className="w-5 h-5 text-primary" />,
      text: "Get the best deals without compromising on quality.",
    },
    {
      label: "Verified Listings",
      icon: <ArrowRightIcon className="w-5 h-5 text-primary" />,
      text: "All rooms and properties are thoroughly verified for safety.",
    },
    {
      label: "Zero Brokerage Fees",
      icon: <ArrowRightIcon className="w-5 h-5 text-primary" />,
      text: "No more middleman and excess brokerage on our platform.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-screen  lg:min-h-full py-14">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://www.gharpadharo.com/",
              logo: "https://www.gharpadharo.com/android-chrome-192x192.png",
              name: "Ghar Padharo",
            }),
          }}
        />
      </Head>
      {/* Hero Section */}
      <div className="flex justify-center items-center flex-col lg:flex-row p-3 py-10 pb-20  w-full hf lg:h-screen lg:space-x-40  relative  ">
        <Image
          src={"/assets/illustraion/layered-waves-haikei.svg"}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
        {/* <div className="bg-black/50 absolute top-0 left-0 w-full h-full"></div> */}

        <div className="w-screen lg:w-fit lg:h-screen z-50 flex flex-col justify-center items-center lg:items-start p-3 space-y-5 text-netural relative">
          <Image
            alt="home-search"
            width={100}
            height={100}
            src={"/assets/illustraion/home-search.svg"}
          />

          <div className="text-5xl lg:text-7xl text-center lg:text-left">
            <h1 className="font-bold ">Find Your Space.</h1>
            <h1 className="font-bold  ">
              <span className="text-primary">Fuel Your</span>Success.{" "}
            </h1>
          </div>
          <p className="font-medium text-center lg:text-left">
            Easily discover a variety of commercial properties that fit your
            business
            <br />
            no more hassles, just the perfect space.
          </p>
          <button className="bg-buttons w-fit py-3 px-6 font-medium rounded-lg text-white lg:flex space-x-1 cursor-pointer hidden ">
            <span>View Rooms</span>
            <ArrowRightIcon className="w-5" />
          </button>
        </div>
        <div className="w-fit lg:h-screen flex justify-center items-center relative">
          <PropertySearch />
        </div>
      </div>

      {/* Discover Properties */}
      <PropertiesPage />

      {/* Why to choose US */}

      <div className=" flex flex-col lg:flex-row items-center justify-between w-full px-6 lg:px-36 py-10 lg:py-20 bg-white gap-10">
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <div className="w-full lg:w-3/4 h-[400px] relative  overflow-hidden">
            <Image
              src="/assets/newimages/why2.jpg"
              alt="Why Choose Us"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
             Why Choose Us for Commercial Property
          </h2>
          <p className="text-neutral-600 text-sm lg:text-base">
            It&apos;s our job to make sure that you get the best possible deal
            on the property.
          </p>

          <div className="grid grid-cols-1 gap-5">
            {chooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 text-neutral-700"
              >
                <span className="text-primary text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold">
                    {item.label}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}

      <Testimonials />

      {/* List Your Property */}

      <div className="w-full p-3 lg:px-30">
        <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between bg-[#f3f6fd] rounded-3xl shadow-2xl  w-full h-80 relative">
          {/* Text Section */}
          <div className="max-w-lg p-8 md:p-12 flex flex-col justify-center items-center">
            <p className="text-sm font-semibold text-blue-600 uppercase">
              Become Partners
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-black mt-2 text-center">
              List your Properties on{" "}
              <span className="text-primary font-bold">GharPadharo</span>, join
              Us Now!
            </h2>
            <Link
              href={"/owner-dashboard/properties/add-properties"}
              className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full  font-medium flex items-center  transition"
            >
              <span>Add your property</span>
              <ChevronRightIcon className="w-6 mt-1" />
            </Link>
          </div>

          {/* Image Section */}
          <div className="hidden lg:block w-1/2 relative h-full">
            <Image
              width={2000}
              height={2000}
              src="/assets/illustraion/home-cutout.png"
              alt="Property"
              className="w-full h-[120%]   absolute right-0 bottom-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
