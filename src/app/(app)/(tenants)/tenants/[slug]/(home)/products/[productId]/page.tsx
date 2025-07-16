import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductIdView } from "@/features/products/views/ProductIdView";

interface Props {
  params: Promise<{ slug: string; productId: string }>;
}

async function ProductIdPage({ params }: Props) {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getOne.queryOptions({
      id: productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductIdView productId={productId} tenantSlug={slug} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default ProductIdPage;
