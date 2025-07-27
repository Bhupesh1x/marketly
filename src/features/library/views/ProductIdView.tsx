"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import {
  ReviewSidebar,
  ReviewSidebarSkeleton,
} from "@/features/reviews/components/ReviewSidebar";

interface Props {
  productId: string;
}

export function ProductIdView({ productId }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 border-b bg-[#F4F4F0]">
        <Link href="/library" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-5" />
          <span className="text-lg font-medium">Back to library</span>
        </Link>
      </nav>
      <header className="border-b bg-[#F4F4F0]">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
          <h1 className="text-3xl font-semibold">{data?.name || ""}</h1>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16 w-full">
          <div className="lg:col-span-2 bg-white border rounded-md p-4">
            <Suspense fallback={<ReviewSidebarSkeleton />}>
              <ReviewSidebar productId={productId} />
            </Suspense>
          </div>

          <div className="lg:col-span-5">
            {data?.content ? (
              <p>{data?.content}</p>
            ) : (
              <p className="font-medium italic text-muted-foreground">
                No special content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
