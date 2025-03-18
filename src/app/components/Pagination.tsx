import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PaginationContent({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
      >
        <FaChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-white">
        Page {currentPage} sur {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
      >
        <FaChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="h-8 w-8 bg-gray-800/50 rounded-md animate-pulse" />
          <div className="h-4 w-24 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-800/50 rounded-md animate-pulse" />
        </div>
      }
    >
      <PaginationContent totalPages={totalPages} />
    </Suspense>
  );
}
