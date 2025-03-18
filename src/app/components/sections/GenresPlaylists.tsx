"use client";

import { motion } from "framer-motion";
import { FaChevronRight, FaPlay, FaListUl } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type {
  CategoryObject as Category,
  SimplifiedPlaylist as Playlist,
} from "@/features/spotify/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface GenresPlaylistsSectionProps {
  isLoading: boolean;
  error: string | null;
  categories: Category[] | undefined;
  featuredPlaylists: Playlist[] | undefined;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  router: AppRouterInstance;
}

export function GenresPlaylistsSection({
  isLoading,
  error,
  categories,
  featuredPlaylists,
  activeTab,
  setActiveTab,
  router,
}: GenresPlaylistsSectionProps) {
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

  // Generate a gradient color based on index
  const getGradient = (index: number) => {
    const gradients = [
      "from-pink-500 to-purple-500",
      "from-yellow-500 to-orange-500",
      "from-green-500 to-emerald-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-indigo-500",
      "from-red-500 to-pink-500",
      "from-amber-500 to-yellow-500",
      "from-teal-500 to-green-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Tabs
          defaultValue="genres"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white/5 p-1">
              <TabsTrigger
                value="genres"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Genres
              </TabsTrigger>
              <TabsTrigger
                value="playlists"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Playlists
              </TabsTrigger>
            </TabsList>

            <Button
              variant="ghost"
              className="text-white hover:text-green-400 group"
              onClick={() =>
                router.push(activeTab === "genres" ? "/genres" : "/playlists")
              }
            >
              Explorer{" "}
              <FaChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          <TabsContent value="genres" className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl" />
                  ))}
              </div>
            ) : error ? (
              <div className="text-center p-8 rounded-xl bg-red-500/10 text-red-400">
                <p className="font-medium">Une erreur est survenue</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {categories?.map((genre, index) => (
                  <motion.div key={genre.id} variants={itemVariants}>
                    <Link href={`/genres/${genre.id}`} className="block group">
                      <div
                        className={`h-24 rounded-xl bg-gradient-to-r ${getGradient(
                          index
                        )} p-4 flex flex-col justify-between overflow-hidden relative hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300`}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <h3 className="text-xl font-bold text-white relative z-10">
                          {genre.name}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <Card
                      key={i}
                      className="bg-white/5 border-white/10 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : error ? (
              <div className="text-center p-8 rounded-xl bg-red-500/10 text-red-400">
                <p className="font-medium">Une erreur est survenue</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {featuredPlaylists?.map((playlist) => (
                  <motion.div
                    key={playlist.id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={`/playlists/${playlist.id}`}>
                      <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full">
                        <CardContent className="p-0 h-full">
                          <div className="relative aspect-square">
                            {playlist.images?.[0]?.url ? (
                              <Image
                                src={
                                  playlist.images[0].url || "/placeholder.svg"
                                }
                                alt={playlist.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <FaListUl className="h-12 w-12 text-gray-700" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button
                                  size="icon"
                                  className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
                                >
                                  <FaPlay className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
                              {playlist.name}
                            </h3>
                            <p className="text-sm text-gray-400 truncate">
                              {playlist.description || "Playlist Spotify"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
