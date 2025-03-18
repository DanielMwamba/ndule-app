"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FaSearch, FaMusic, FaSpotify, FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface FloatingSearchBarProps {
  scrolled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent, query: string) => void;
}

export function FloatingSearchBar({
  scrolled,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: FloatingSearchBarProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  // Pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-2 mr-4 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="relative w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <FaMusic className="h-4 w-4 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse opacity-50 blur-sm"></div>
                </div>
                <span className="font-bold text-white hidden sm:inline">
                  NduleApp
                </span>
              </div>

              <form
                onSubmit={(e) => handleSearch(e, searchQuery)}
                className="relative flex-1 max-w-2xl"
              >
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
                {isMounted && (
                  <>
                    {status === "authenticated" && session?.user ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="relative h-8 w-8 rounded-full p-0 overflow-hidden"
                          >
                            {session.user.image ? (
                              <Image
                                src={session.user.image || "/placeholder.svg"}
                                alt={session.user.name || "Avatar utilisateur"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <FaUserCircle className="h-8 w-8 text-green-500" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 bg-gray-900 border-gray-800 text-white"
                        >
                          <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                              {session.user.name && (
                                <p className="font-medium">
                                  {session.user.name}
                                </p>
                              )}
                              {session.user.email && (
                                <p className="w-[200px] truncate text-sm text-gray-400">
                                  {session.user.email}
                                </p>
                              )}
                            </div>
                          </div>
                          <DropdownMenuSeparator className="bg-gray-800" />
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                            onClick={() => router.push("/profile")}
                          >
                            Profil
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                            onClick={() => router.push("/settings")}
                          >
                            Paramètres
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-800" />
                          <DropdownMenuItem
                            className="cursor-pointer text-red-400 hover:bg-gray-800 focus:bg-gray-800"
                            onClick={() => signOut()}
                          >
                            Déconnexion
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                        onClick={() => router.push("/sign-in")}
                      >
                        <FaSpotify className="mr-1.5 h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Connexion</span>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
