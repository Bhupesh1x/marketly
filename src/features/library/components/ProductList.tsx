"use client";

import { InboxIcon } from "lucide-react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/ProductCard";

import { Button } from "@/components/ui/button";

export function ProductList() {
  const trpc = useTRPC();
  const {
    data: products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage?.docs?.length > 0 ? lastPage.nextPage : undefined;
        },
      }
    )
  );

  if (!products?.pages?.[0]?.docs?.length) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-md">
        <InboxIcon />
        <p className="text-base font-medium">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {products?.pages
          ?.flatMap((page) => page?.docs ?? [])
          ?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product?.name || ""}
              tenantSlug={product?.tenant?.slug}
              tenantImageUrl={product?.tenant?.image?.url}
              price={product.price}
              rating={3}
              reviewCount={5}
              imageUrl={product?.image?.url || ""}
              isLibrary
            />
          ))}
      </div>
      <div className="pt-8 flex justify-center">
        {hasNextPage && (
          <Button
            variant="elevated"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
}

export function ProductListSkeleton({ narrowView }: { narrowView?: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ${narrowView ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3" : ""}`}
    >
      {Array.from({ length: DEFAULT_LIMIT })?.map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
