"use client";

import { useProductFilters } from "../hooks/useProductFilters";

import { PriceFilter } from "./PriceFilter";
import { ProductFilter } from "./ProductFilter";

export function ProductFilters() {
  const [filters, setFilters] = useProductFilters();

  function onChange(key: keyof typeof filters, value: unknown) {
    setFilters({ ...filters, [key]: value });
  }

  function onClear() {
    setFilters({
      maxPrice: "",
      minPrice: "",
    });
  }

  const hasFilters = Object.entries(filters)?.some(([, value]) => {
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

      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters?.minPrice}
          maxPrice={filters?.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
}
