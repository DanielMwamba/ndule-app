"use client";

import { motion } from "framer-motion";
import {
  FaChartLine,
  FaChevronRight,
  FaPlay,
  FaMusic,
  FaHeadphones,
  FaPause,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type {
  TrackObjectFull as Track,
  ArtistObjectSimplified,
} from "@/features/spotify/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpotifyPlayer } from "@/features/spotify/hooks/useSpotifyPlayer";

interface TrendingTracksSectionProps {
  isLoading: boolean;
  error: string | null;
  trendingTracks: Track[] | undefined;
  router: AppRouterInstance;
  accessToken: string | null;
}

export function TrendingTracksSection({
  isLoading,
  error,
  trendingTracks,
  router,
  accessToken,
}: TrendingTracksSectionProps) {
  const { playTrack, currentTrack, isPaused } = useSpotifyPlayer(accessToken);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Format duration from ms to MM:SS
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-0" />
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[20%] -right-[20%] w-[40%] h-[40%] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-md rounded-full" />
              <FaChartLine className="h-6 w-6 text-green-400 relative" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Titres Tendances
            </h2>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:text-green-400 group flex items-center gap-1 px-4 py-2 rounded-full hover:bg-white/5 transition-all"
            onClick={() => router.push("/tracks")}
          >
            <span>Voir plus</span>
            <FaChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="bg-white/5 border-white/10 overflow-hidden rounded-xl"
                >
                  <CardContent className="p-0">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400 max-w-md mx-auto"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-4">
              <span className="text-red-400 text-xl">!</span>
            </div>
            <p className="font-medium text-lg">Une erreur est survenue</p>
            <p className="text-sm mt-2 text-red-400/80">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {trendingTracks?.map((track, index) => (
              <motion.div
                key={track.id}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-black/60 transition-all duration-300 h-full rounded-xl shadow-lg hover:shadow-green-500/10 hover:border-green-500/20">
                  <CardContent className="p-0 h-full">
                    <div className="relative aspect-square">
                      {track.album?.images?.[0]?.url ? (
                        <Image
                          src={track.album.images[0].url || "/placeholder.svg"}
                          alt={track.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <FaMusic className="h-12 w-12 text-gray-700" />
                        </div>
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="icon"
                            className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl"
                            onClick={() => playTrack(track.uri)}
                          >
                            {currentTrack?.uri === track.uri && !isPaused ? (
                              <FaPause className="h-5 w-5" />
                            ) : (
                              <FaPlay className="h-5 w-5 ml-1" />
                            )}
                          </Button>
                        </motion.div>
                      </div>

                      {/* Ranking badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-3 py-1 font-semibold shadow-lg">
                          <FaChartLine className="mr-1.5 h-3 w-3 text-green-400" />
                          #{index + 1}
                        </Badge>
                      </div>

                      {/* Album type badge */}
                      {track.album?.album_type && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className="bg-green-500/80 backdrop-blur-md text-white px-2 py-0.5 text-xs uppercase tracking-wider shadow-lg">
                            {track.album.album_type}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-5 relative">
                      {/* Track info */}
                      <h3 className="font-semibold text-white text-lg truncate group-hover:text-green-400 transition-colors">
                        {track.name}
                      </h3>
                      <p className="text-sm text-gray-400 truncate mt-1">
                        {track.artists?.map(
                          (artist: ArtistObjectSimplified, i: number) => (
                            <span key={artist.id}>
                              {i > 0 && ", "}
                              <Link
                                href={`/artists/${artist.id}`}
                                className="hover:text-green-400 hover:underline transition-colors"
                              >
                                {artist.name}
                              </Link>
                            </span>
                          )
                        )}
                      </p>

                      {/* Track metadata */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-xs text-gray-500">
                          {track.duration_ms && (
                            <span className="flex items-center">
                              <FaHeadphones className="mr-1 h-3 w-3 text-gray-400" />
                              {formatDuration(track.duration_ms)}
                            </span>
                          )}
                        </div>

                        {/* Popularity indicator */}
                        {track.popularity && (
                          <div className="flex items-center">
                            <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full"
                                style={{ width: `${track.popularity}%` }}
                              />
                            </div>
                            <span className="ml-2 text-xs text-gray-400">
                              {track.popularity}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
