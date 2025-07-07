import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductList } from "@/features/products/components/ProductList";
import { ProductFilters } from "@/features/products/components/ProductFilters";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-12 py-6 grid grid-cols-1 lg:grid-cols-7 xl:grid-cols-8 gap-8">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-5 xl:col-span-6">
          <Suspense fallback={<p>Loading...</p>}>
            <ProductList category={category} />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}

export default CategoryPage;
