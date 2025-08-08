"use client";
import { StarIcon } from "@heroicons/react/20/solid";
import React, { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import api from "@/utils/axiosInstace";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface TestimonialProps {
  review: string;
  rating: number;
  reviewer: {
    name: string;
    userType: string;
    photo: string;
  };
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTestimonials = async () => {
    try {
      const { data } = await api.get("/user/get-testimonials");
      setTestimonials(data);
    } catch (err) {
      setError("Could not load testimonials 😓");
      console.error("Fetch testimonials failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  const loadingSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const realSettings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, testimonials.length || 1),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, testimonials.length || 1),
          slidesToScroll: 1,
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

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 p-3">
      <h3 className="text-sm text-primary font-medium">OUR TESTIMONIALS</h3>
      <h1 className="text-3xl lg:text-4xl font-bold">What People Say</h1>
      <p className="text-center max-w-2xl text-gray-600 p-3">
        Our seasoned team excels in real estate with years of successful market
        navigation, offering informed decisions and optimal results.
      </p>
      <div className="w-screen lg:w-full lg:max-w-7xl">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <Slider {...(loading ? loadingSettings : realSettings)}>
            {loading
              ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
              : testimonials.length > 0
              ? testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    review={testimonial.review}
                    rating={testimonial.rating}
                    reviewer={testimonial.reviewer}
                  />
                ))
              : [
                  <div key="no-data" className="text-center py-10 w-full">
                    No testimonials yet 😅
                  </div>,
                ]}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Testimonials;

const TestimonialCard: FC<TestimonialProps> = ({
  review,
  rating,
  reviewer,
}) => {
  return (
    <div className="px-4 w-full max-w-screen lg:w-full">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full text-center mb-10">
        <div className="text-blue-600 text-4xl mb-4">&#8220;</div>
        <p className="text-gray-700 text-lg leading-relaxed line-clamp-2">
          {review}
        </p>
        <div className="flex items-center justify-center mt-6">
          <Image
            width={50}
            height={50}
            src={reviewer?.photo || "/img"}
            alt={reviewer?.name || "reviewer"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4 text-left">
            <p className="text-lg font-semibold">{reviewer?.name}</p>
            <p className="text-sm text-gray-500">{reviewer?.userType}</p>
            <div className="flex mt-1 text-yellow-500">
              {[...Array(rating)].map((_, index) => (
                <StarIcon
                  key={index}
                  className="w-4 h-4"
                  fill="currentColor"
                  stroke="none"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="px-4 w-fit lg:w-96 h-96">
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full text-center mb-10 animate-pulse">
      <div className="text-blue-300 text-4xl mb-4">&#8220;</div>
      <div className="h-4 bg-gray-300 rounded mb-3 w-3/4 mx-auto" />
      <div className="h-4 bg-gray-300 rounded mb-3 w-2/3 mx-auto" />
      <div className="flex items-center justify-center mt-6">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div className="ml-4 text-left">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-300 rounded w-16" />
        </div>
      </div>
    </div>
  </div>
);
