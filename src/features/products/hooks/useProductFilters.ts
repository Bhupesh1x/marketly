import {
  parseAsString,
  useQueryStates,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["curated", "trending", "hot_and_new"] as const;

const params = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  minPrice: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  maxPrice: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  tags: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
    clearOnDefault: true,
  }),
  sort: parseAsStringLiteral(sortValues)
    .withDefault("curated")
    .withOptions({ clearOnDefault: true }),
};

export function useProductFilters() {
  return useQueryStates(params);
}
