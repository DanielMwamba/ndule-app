"use client";

import { useEffect } from "react";
import { useSpotify } from "@/app/hooks/useSpotify";
import { TrackCard } from "@/app/components/ui/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function TracksPage() {
  const { getHomePageData, homePageData, isLoading, error } = useSpotify();

  useEffect(() => {
    getHomePageData();
  }, [getHomePageData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Titres Tendances</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homePageData?.trendingTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
