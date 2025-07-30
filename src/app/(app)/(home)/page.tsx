import { SearchParams } from "nuqs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";

import { getQueryClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/features/products/productParams";
import { ProductListView } from "@/features/products/views/ProductListView";

interface Props {
  searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

async function CategoryPage({ searchParams }: Props) {
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
}

export default CategoryPage;
