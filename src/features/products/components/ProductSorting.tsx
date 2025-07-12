"use client";

import { Button } from "@/components/ui/button";

import { useProductFilters } from "../hooks/useProductFilters";

export function ProductSorting() {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-full ${filters?.sort === "curated" ? "bg-white" : "bg-transparent border-none"}`}
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-full ${filters?.sort === "trending" ? "bg-white" : "bg-transparent border-none"}`}
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-full ${filters?.sort === "hot_and_new" ? "bg-white" : "bg-transparent border-none"}`}
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
}
