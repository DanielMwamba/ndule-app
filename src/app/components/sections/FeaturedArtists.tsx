"use client"

import { motion } from "framer-motion"
import { FaChevronRight, FaPlay, FaMusic } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi2"
import Image from "next/image"
import Link from "next/link"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import type { Artist } from "@/types/spotify"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface FeaturedArtistsSectionProps {
  isLoading: boolean
  error: string | null
  featuredArtists: Artist[] | undefined
  router: AppRouterInstance
}

export function FeaturedArtistsSection({ isLoading, error, featuredArtists, router }: FeaturedArtistsSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 z-0" />

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-green-500/5 blur-3xl" />
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
              <HiSparkles className="h-6 w-6 text-green-400 relative" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Artistes à Découvrir</h2>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:text-green-400 group flex items-center gap-1 px-4 py-2 rounded-full hover:bg-white/5 transition-all"
            onClick={() => router.push("/artists")}
          >
            <span>Voir plus</span>
            <FaChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative">
                    <Skeleton className="h-32 w-32 sm:h-40 sm:w-40 rounded-full" />
                    <Skeleton className="absolute bottom-0 right-0 h-10 w-10 rounded-full" />
                  </div>
                  <div className="mt-4 space-y-2 w-full">
                    <Skeleton className="h-4 w-24 mx-auto" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                </div>
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8"
          >
            {featuredArtists?.map((artist) => (
              <motion.div key={artist.id} variants={itemVariants} className="flex flex-col items-center group">
                <Link href={`/artists/${artist.id}`} className="block w-full">
                  <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300">
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-70 blur-sm group-hover:blur transition-all duration-300" />

                    {/* Border */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-green-500/50 transition-all duration-300 z-10" />

                    {/* Image */}
                    <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
                      {artist.images?.[0]?.url ? (
                        <Image
                          src={artist.images[0].url || "/placeholder.svg"}
                          alt={artist.name}
                          fill
                          sizes="(max-width: 640px) 8rem, 10rem"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <FaMusic className="h-10 w-10 text-gray-700" />
                        </div>
                      )}
                    </div>

                    {/* Overlay with play button */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                      <motion.div initial={{ scale: 0.8 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="icon"
                          className="h-10 w-10 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
                        >
                          <FaPlay className="h-4 w-4 ml-0.5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  <div className="text-center space-y-1 px-2">
                    <motion.h3
                      className="font-semibold text-white group-hover:text-green-400 transition-colors truncate"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {artist.name}
                    </motion.h3>

                    {artist.followers && (
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {new Intl.NumberFormat("fr-FR", {
                          notation: "compact",
                        }).format(artist.followers.total)}{" "}
                        followers
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

