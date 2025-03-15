"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  placeholder = "Rechercher...",
  className,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-12 py-6 bg-gray-800/50 backdrop-blur-lg rounded-full 
                  text-white placeholder:text-gray-400 border-none
                  focus-visible:ring-2 focus-visible:ring-green-500"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2
                   bg-green-500 hover:bg-green-600 rounded-full"
      >
        <BsSearch className="w-4 h-4" />
      </Button>
    </form>
  );
}
