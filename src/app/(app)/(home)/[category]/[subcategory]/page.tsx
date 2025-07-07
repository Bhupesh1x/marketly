import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductList } from "@/features/products/components/ProductList";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

async function SubCategoryPage({ params }: Props) {
  const { subcategory } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default SubCategoryPage;
