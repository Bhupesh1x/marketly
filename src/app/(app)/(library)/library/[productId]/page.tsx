import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { caller, getQueryClient, trpc } from "@/trpc/server";

import { ProductIdView } from "@/features/library/views/ProductIdView";

interface Props {
  params: Promise<{ productId: string }>;
}

async function ProductIdPage({ params }: Props) {
  const session = await caller.auth.session();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { productId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );

  void queryClient.prefetchQuery(
    trpc.reviews.getOne.queryOptions({
      productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductIdView productId={productId} />
    </HydrationBoundary>
  );
}

export default ProductIdPage;
