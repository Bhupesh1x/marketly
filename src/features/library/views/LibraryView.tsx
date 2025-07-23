import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { ProductList, ProductListSkeleton } from "../components/ProductList";

export function LibraryView() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 border-b bg-[#F4F4F0]">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-5" />
          <span className="text-lg font-medium">Continue shopping</span>
        </Link>
      </nav>
      <header className="border-b bg-[#F4F4F0]">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
          <h1 className="text-3xl font-semibold">Library</h1>
          <p className="font-medium">Your purchases and reviews</p>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto py-8 px-4 lg:px-12">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
}
