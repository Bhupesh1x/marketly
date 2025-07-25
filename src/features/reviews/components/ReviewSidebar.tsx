import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ReviewForm } from "./ReviewForm";

interface Props {
  productId: string;
}

export function ReviewSidebar({ productId }: Props) {
  const trpc = useTRPC();
  const { data: review } = useSuspenseQuery(
    trpc.reviews.getOne.queryOptions({
      productId,
    })
  );

  return (
    <>
      <ReviewForm initialData={review} productId={productId} />
    </>
  );
}
