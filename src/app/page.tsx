"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpotify } from "@/features/spotify/hooks/useSpotify";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type {
  TrackObjectFull,
  ArtistObjectFull,
  CategoryObject,
  SimplifiedPlaylist,
} from "@/features/spotify/types";

// Types pour les props des composants
interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent, query: string) => void;
}

interface FloatingSearchBarProps {
  scrolled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent, query: string) => void;
}

interface TrendingTracksProps {
  isLoading: boolean;
  error: string | null;
  trendingTracks: TrackObjectFull[];
  router: ReturnType<typeof useRouter>;
  accessToken: string | null;
}

interface FeaturedArtistsProps {
  isLoading: boolean;
  error: string | null;
  featuredArtists: ArtistObjectFull[];
  router: ReturnType<typeof useRouter>;
}

interface GenresPlaylistsProps {
  isLoading: boolean;
  error: string | null;
  categories: CategoryObject[];
  featuredPlaylists: SimplifiedPlaylist[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  router: ReturnType<typeof useRouter>;
}

// Lazy load components avec leurs types
const HeroSection = dynamic<HeroSectionProps>(
  () =>
    import("@/app/components/sections/Hero").then((mod) => ({
      default: mod.HeroSection,
    })),
  {
    loading: () => <div className="h-screen" />,
  }
);
const FeaturesSection = dynamic(
  () =>
    import("@/app/components/sections/Features").then((mod) => ({
      default: mod.FeaturesSection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);
const TrendingTracksSection = dynamic<TrendingTracksProps>(
  () =>
    import("@/app/components/sections/TrendingTracks").then((mod) => ({
      default: mod.TrendingTracksSection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);
const FeaturedArtistsSection = dynamic<FeaturedArtistsProps>(
  () =>
    import("@/app/components/sections/FeaturedArtists").then((mod) => ({
      default: mod.FeaturedArtistsSection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);
const GenresPlaylistsSection = dynamic<GenresPlaylistsProps>(
  () =>
    import("@/app/components/sections/GenresPlaylists").then((mod) => ({
      default: mod.GenresPlaylistsSection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);
const CTASection = dynamic(
  () =>
    import("@/app/components/sections/CTA").then((mod) => ({
      default: mod.CTASection,
    })),
  {
    loading: () => <div className="h-96" />,
  }
);
const Footer = dynamic(
  () =>
    import("@/app/components/sections/Footer").then((mod) => ({
      default: mod.Footer,
    })),
  {
    loading: () => <div className="h-32" />,
  }
);
const FloatingSearchBar = dynamic<FloatingSearchBarProps>(
  () =>
    import("@/app/components/sections/FloatingSearchBar").then((mod) => ({
      default: mod.FloatingSearchBar,
    })),
  {
    loading: () => <div className="h-16" />,
  }
);

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
        trendingTracks={homePageData?.trendingTracks ?? []}
        router={router}
        accessToken={accessToken}
      />

      {/* Featured Artists Section */}
      <FeaturedArtistsSection
        isLoading={isLoading}
        error={error}
        featuredArtists={homePageData?.featuredArtists ?? []}
        router={router}
      />

      {/* Genres & Playlists Section */}
      <GenresPlaylistsSection
        isLoading={isLoading}
        error={error}
        categories={homePageData?.categories ?? []}
        featuredPlaylists={homePageData?.featuredPlaylists ?? []}
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
