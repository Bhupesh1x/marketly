import { useQueryStates } from "nuqs";
import { parseAsString, createLoader } from "nuqs/server";

export const params = {
  minPrice: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  maxPrice: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
};

export function useProductFilters() {
  return useQueryStates(params);
}

export const loadProductFilters = createLoader(params);
