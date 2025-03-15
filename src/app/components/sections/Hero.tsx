"use client";

import type React from "react";

import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiSparkles } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/app/components/ui/badge";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent, query: string) => void;
}

export function HeroSection({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            <HiSparkles className="mr-1 h-3 w-3 text-green-400" />
            Découvrez notre nouvelle expérience musicale
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Découvrez la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Musique
            </span>{" "}
            sans limites
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explorez des millions de titres, artistes et playlists. Commencez
            votre voyage musical dès maintenant.
          </p>

          <form
            onSubmit={(e) => handleSearch(e, searchQuery)}
            className="relative max-w-2xl mx-auto"
          >
            <HiMagnifyingGlass className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un artiste, un titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 py-6 bg-white/10 border-white/10 rounded-full text-white placeholder:text-gray-400 focus-visible:ring-green-500"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-full px-6 py-5"
            >
              Rechercher
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
