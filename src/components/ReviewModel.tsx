"use client";
import React, { useEffect, useState } from "react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/solid";
import api from "@/utils/axiosInstace";
import { useLogin } from "@/context/LoginContext";

const ReviewModal = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { hasReviewed } = useLogin();
  useEffect(() => {
    if (!hasReviewed) {
      setTimeout(() => setOpen(true), 20000);
    }
  }, [hasReviewed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !description.trim()) return;

    try {
      await api.post("/user/add-review", {
        rating,
        review: description,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-[9999]">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Leave a Review</h2>

          {/* Star Rating */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className={`w-7 h-7 cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Description */}
          <textarea
            placeholder="Share your thoughts (max 1000 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            rows={5}
            required
            className="w-full border rounded px-3 py-2"
          />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
