"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ProductCard } from "./ProductCard";

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
        <ProductCard
          key={product.id}
          id={product.id}
          name={product?.name || ""}
          authorName="john"
          authorImageUrl={null}
          price={product.price}
          rating={3}
          reviewCount={5}
          imageUrl={product?.image?.url || ""}
        />
      ))}
    </div>
  );
}
