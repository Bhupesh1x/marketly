"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { useProductFilters } from "../hooks/useProductFilters";

interface Props {
  category: string;
}

export function ProductList({ category }: Props) {
  const trpc = useTRPC();
  const [filters] = useProductFilters();
  const { data: products } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
      ...filters,
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products?.docs?.map((product) => (
        <div key={product.id} className="border p-3 rounded-md bg-white">
          <h4>{product?.name}</h4>
          <p>₹ {product?.price}</p>
        </div>
      ))}
    </div>
  );
}
