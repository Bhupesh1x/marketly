import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductSorting } from "@/features/products/components/ProductSorting";

import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/components/search-filters";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

async function layout({ children }: Props) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 px-4 lg:px-12 pt-6 bg-[#f4f4f0]">
        <h1 className="text-xl font-medium">Curated for you</h1>
        <ProductSorting />
      </div>
      <main className="flex-1 bg-[#f4f4f0]">{children}</main>
      <Footer />
    </div>
  );
}

export default layout;
