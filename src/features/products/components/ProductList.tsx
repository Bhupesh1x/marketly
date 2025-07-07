"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

interface Props {
  category: string;
}

export function ProductList({ category }: Props) {
  const trpc = useTRPC();
  const { data: products } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    })
  );

  return (
    <div>
      <h1>{JSON.stringify(products, null, 2)}</h1>
    </div>
  );
}
