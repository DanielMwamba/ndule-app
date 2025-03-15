"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpotify } from "@/app/hooks/useSpotify";
import { useSession } from "next-auth/react";

import { HeroSection } from "@/app/components/sections/Hero";
import { FeaturesSection } from "@/app/components/sections/Features";
import { TrendingTracksSection } from "@/app/components/sections/TrendingTracks";
import { FeaturedArtistsSection } from "@/app/components/sections/FeaturedArtists";
import { GenresPlaylistsSection } from "@/app/components/sections/GenresPlaylists";
import { CTASection } from "@/app/components/sections/CTA";
import { Footer } from "@/app/components/sections/Footer";
import { FloatingSearchBar } from "@/app/components/sections/FloatingSearchBar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("genres");
  const { getHomePageData, homePageData, isLoading, error } = useSpotify();
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | null;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch home page data
  useEffect(() => {
    getHomePageData();
  }, [getHomePageData]);

  // Handle search
  const handleSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Floating Search Bar */}
      <FloatingSearchBar
        scrolled={scrolled}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Trending Tracks Section */}
      <TrendingTracksSection
        isLoading={isLoading}
        error={error}
        trendingTracks={homePageData?.trendingTracks}
        router={router}
        accessToken={accessToken}
      />

      {/* Featured Artists Section */}
      <FeaturedArtistsSection
        isLoading={isLoading}
        error={error}
        featuredArtists={homePageData?.featuredArtists}
        router={router}
      />

      {/* Genres & Playlists Section */}
      <GenresPlaylistsSection
        isLoading={isLoading}
        error={error}
        categories={homePageData?.categories}
        featuredPlaylists={homePageData?.featuredPlaylists}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        router={router}
      />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
