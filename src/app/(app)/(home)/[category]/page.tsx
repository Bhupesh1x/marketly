import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductList } from "@/features/products/components/ProductList";

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
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default CategoryPage;
