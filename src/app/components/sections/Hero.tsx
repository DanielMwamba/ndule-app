"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useAnimation} from "framer-motion"
import { HiMagnifyingGlass, HiSparkles, HiMusicalNote } from "react-icons/hi2"
import { FaSpotify, FaHeadphones, FaCompactDisc} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface HeroSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent, query: string) => void
}

export function HeroSection({ searchQuery, setSearchQuery, handleSearch }: HeroSectionProps) {
  const { data: session } = useSession()
  const controls = useAnimation()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const rotatingTexts = ["Musique", "Rythme", "Mélodie", "Passion", "Émotion"]

  // Animation pour le texte rotatif
  useEffect(() => {
    const interval = setInterval(() => {
      controls
        .start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.3 },
        })
        .then(() => {
          setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          })
        })
    }, 3000)

    return () => clearInterval(interval)
  }, [controls])

  // Effet de particules musicales
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <section className="relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute opacity-20"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 30}%`],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            {particle.id % 3 === 0 ? (
              <HiMusicalNote
                className={`text-green-500/30 h-${Math.floor(particle.size)}  w-${Math.floor(particle.size)}`}
              />
            ) : particle.id % 3 === 1 ? (
              <FaHeadphones
                className={`text-purple-500/30 h-${Math.floor(particle.size)}  w-${Math.floor(particle.size)}`}
              />
            ) : (
              <FaCompactDisc
                className={`text-blue-500/30 h-${Math.floor(particle.size)}  w-${Math.floor(particle.size)}`}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Cercles décoratifs */}
      <div className="absolute top-0 left-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute top-60 left-80 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-60 right-80 h-[300px] w-[300px] rounded-full bg-pink-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-white/10 shadow-xl">
              <HiSparkles className="mr-1.5 h-3.5 w-3.5 text-green-400 animate-pulse" />
              <span className="mr-1.5">Propulsé par</span>
              <FaSpotify className="h-4 w-4 text-[#1DB954]" />
              <span className="ml-1.5">Spotify</span>
            </Badge>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Découvrez la{" "}
            <span className="relative inline-block">
              <motion.span
                animate={controls}
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600"
              >
                {rotatingTexts[currentTextIndex]}
              </motion.span>
              <span className="invisible">Musique</span>
            </span>{" "}
            sans limites
          </h1>

          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Explorez des millions de titres, artistes et playlists. Commencez votre voyage musical dès maintenant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <form
              onSubmit={(e) => handleSearch(e, searchQuery)}
              className="relative"
            >
              <HiMagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher un artiste, un titre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 py-6 bg-white/10 border-white/10 rounded-full text-white placeholder:text-gray-400 focus-visible:ring-green-500 shadow-xl backdrop-blur-sm cursor-text"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-full px-6 py-5 shadow-lg shadow-green-500/20 transition-all duration-200 active:scale-95 cursor-pointer border-0"
              >
                Rechercher
              </Button>
            </form>

            {/* Suggestions de recherche populaires */}
            {/* <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 p-3 bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl z-10"
                >
                  <div className="text-left mb-2">
                    <p className="text-xs text-gray-400">Recherches populaires</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <Badge
                        key={term}
                        className="bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all border border-white/5 hover:border-white/20"
                        onClick={() => {
                          setSearchQuery(term)
                          handleSearch(new Event("submit") , term)
                        }}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence> */}
          </motion.div>

          {/* CTA supplémentaire */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {!session ? (
              <Link href="/sign-in" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-6 sm:py-2 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all duration-200 border-0 cursor-pointer hover:scale-105 active:scale-95">
                  <FaSpotify className="h-4 w-4" />
                  Se connecter avec Spotify
                </Button>
              </Link>
            ) : ( ""
              // <Link href="/trending" className="w-full sm:w-auto">
              //   <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-6 sm:py-2 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all duration-200 border-0 cursor-pointer hover:scale-105 active:scale-95">
              //     <FaPlay className="h-3.5 w-3.5" />
              //     Explorer les tendances
              //   </Button>
              // </Link>
            )}

            {/* <Link href="/genres" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border border-gray-700 hover:border-gray-500 text-white hover:bg-white/10 px-6 py-6 sm:py-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                Découvrir les genres
              </Button>
            </Link> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

