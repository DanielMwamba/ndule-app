"use client";

import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

function SearchInputContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("q") as string;
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          name="q"
          placeholder="Rechercher des artistes, albums ou titres..."
          className="pl-10 pr-4 py-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
          defaultValue={query}
        />
      </div>
    </form>
  );
}

export function SearchInput() {
  return (
    <Suspense
      fallback={
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
            <div className="h-10 bg-gray-800/50 rounded-md animate-pulse" />
          </div>
        </div>
      }
    >
      <SearchInputContent />
    </Suspense>
  );
}
