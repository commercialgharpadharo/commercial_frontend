'use client';

import { useState } from 'react';
import { BookmarkIcon } from "@heroicons/react/24/solid";
import api from '@/utils/axiosInstace';

export default function BookmarkButton({ slug, initialFavourite }: {
  slug: string;
  initialFavourite: boolean;
}) {
  const [isFavourite, setIsFavourite] = useState(initialFavourite);

  const handleToggle = async () => {
    try {
      setIsFavourite(prev => !prev);
      await api.put(`/user/favourites/${slug}`);
    } catch (err) {
      setIsFavourite(prev => !prev);
      console.error("Failed to update bookmark", err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`${isFavourite ? "bg-yellow-500" : "bg-white/10"} hover:bg-yellow-500 text-white p-2 rounded-full`}
    >
      <BookmarkIcon className="w-5 h-5" />
    </button>
  );
}
