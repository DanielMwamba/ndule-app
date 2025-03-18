import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

function SearchBarContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher des artistes, albums ou titres..."
          className="pl-10 pr-4 py-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
          defaultValue={query}
        />
      </div>
    </div>
  );
}

export function SearchBar() {
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
      <SearchBarContent />
    </Suspense>
  );
}
