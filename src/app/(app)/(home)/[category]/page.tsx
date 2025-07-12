import { SearchParams } from "nuqs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";

import { getQueryClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/features/products/productParams";
import { ProductListView } from "@/features/products/views/ProductListView";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}

async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary>
  );
}

export default CategoryPage;
