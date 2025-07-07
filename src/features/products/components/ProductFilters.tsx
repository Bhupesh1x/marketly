import { ProductFilter } from "./ProductFilter";

export function ProductFilters() {
  return (
    <div className="border rounded-md bg-white">
      <div className="flex items-center justify-between border-b p-3">
        <p className="font-medium">Filters</p>
        <button type="button" className="underline text-sm cursor-pointer">
          Clear
        </button>
      </div>

      <ProductFilter title="Price" className="border-b-0">
        <p>Price filter!</p>
      </ProductFilter>
    </div>
  );
}
