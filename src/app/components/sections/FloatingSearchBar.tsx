"use client"

import type React from "react"

import { FaSearch, FaMusic, FaBook } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FloatingSearchBarProps {
  scrolled: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent, query: string) => void
}

export function FloatingSearchBar({ scrolled, searchQuery, setSearchQuery, handleSearch }: FloatingSearchBarProps) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "translate-y-0 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-lg" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mr-4">
            <FaMusic className="h-5 w-5 text-green-500" />
            <span className="font-bold text-white hidden sm:inline">MusicApp</span>
          </div>

          <form onSubmit={(e) => handleSearch(e, searchQuery)} className="relative flex-1 max-w-2xl">
            <FaSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un artiste, un titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-green-500"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-full h-7 w-7"
            >
              <FaSearch className="h-3 w-3" />
              <span className="sr-only">Rechercher</span>
            </Button>
          </form>

          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-green-400 hidden sm:flex">
              <FaBook className="mr-1.5 h-3.5 w-3.5" />
              Bibliothèque
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
              Connexion
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

