import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortSelectContent() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "popularity";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    window.history.pushState(null, "", `?${params.toString()}`);
    window.location.reload();
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        <SelectItem value="popularity">Popularité</SelectItem>
        <SelectItem value="name">Nom</SelectItem>
        <SelectItem value="date">Date</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SortSelect() {
  return (
    <Suspense
      fallback={
        <div className="w-[180px] h-10 bg-gray-800/50 rounded-md animate-pulse" />
      }
    >
      <SortSelectContent />
    </Suspense>
  );
}
