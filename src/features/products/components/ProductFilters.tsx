"use client";

import { useProductFilters } from "../hooks/useProductFilters";

import { TagsFilter } from "./TagsFilter";
import { PriceFilter } from "./PriceFilter";
import { ProductFilter } from "./ProductFilter";

export function ProductFilters() {
  const [filters, setFilters] = useProductFilters();

  function onChange(key: keyof typeof filters, value: unknown) {
    setFilters({ ...filters, [key]: value });
  }

  function onClear() {
    setFilters({
      search: "",
      maxPrice: "",
      minPrice: "",
      tags: [],
    });
  }

  const hasFilters = Object.entries(filters)?.some(([key, value]) => {
    if (key === "sort") return false;

    if (Array.isArray(value)) {
      return value?.length > 0;
    }

    if (typeof value === "string") {
      return value !== "";
    }

    return value !== null;
  });

  return (
    <div className="border rounded-md bg-white">
      <div className="flex items-center justify-between border-b p-3">
        <p className="font-medium">Filters</p>
        {hasFilters && (
          <button
            type="button"
            className="underline text-sm cursor-pointer"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </div>

      <ProductFilter title="Price">
        <PriceFilter
          minPrice={filters?.minPrice}
          maxPrice={filters?.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>

      <ProductFilter title="Tags" className="border-b-0">
        <TagsFilter
          value={filters.tags}
          onTagChange={(value) => onChange("tags", value)}
        />
      </ProductFilter>
    </div>
  );
}

export function ProductFiltersSkeleton() {
  return (
    <div className="border rounded-md bg-neutral-200 animate-pulse h-[148px]" />
  );
}
