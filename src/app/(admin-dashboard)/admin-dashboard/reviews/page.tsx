"use client";
import { StarIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import api from "@/utils/axiosInstace"; // Assuming you already have this
import { Review } from "@/types/review";

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <StarIcon
        key={star}
        className={`w-5 h-5 ${
          star <= rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const Page = () => {
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const getReviews = async () => {
    try {
      const { data } = await api.get(`/admin/get-all-reviews`);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // Return `null` to prevent crashes
    }
  };

  const fetchReviews = async () => {
    const data = await getReviews();
    setReviews(data || []);
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    try {
      await api.put(`/admin/update-review-visibility/${id}`, {
        isVisible: !current,
      });
      fetchReviews(); // Refresh state
    } catch (err) {
      console.error("Error updating visibility", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {rev.reviewer?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Stars rating={rev.rating} />
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-5">
                  {rev.review}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => toggleVisibility(rev._id, rev.isVisible)}
                  className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded ${
                    rev.isVisible
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {rev.isVisible ? (
                    <>
                      <EyeIcon className="w-4 h-4" /> Visible
                    </>
                  ) : (
                    <>
                      <EyeSlashIcon className="w-4 h-4" /> Hidden
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
