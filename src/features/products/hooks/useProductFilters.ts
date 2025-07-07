import { parseAsString, useQueryStates } from "nuqs";

export function useProductFilters() {
  return useQueryStates({
    minPrice: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    maxPrice: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  });
}
