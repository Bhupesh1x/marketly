import { Suspense } from "react";

import { ProductList } from "../components/ProductList";
import { ProductFilters } from "../components/ProductFilters";

interface Props {
  category?: string;
}

export function ProductListView({ category }: Props) {
  return (
    <div className="px-4 lg:px-12 py-6 grid grid-cols-1 lg:grid-cols-7 xl:grid-cols-8 gap-8">
      <div className="lg:col-span-2 xl:col-span-2">
        <ProductFilters />
      </div>
      <div className="lg:col-span-5 xl:col-span-6">
        <Suspense fallback={<p>Loading...</p>}>
          <ProductList category={category || ""} />
        </Suspense>
      </div>
    </div>
  );
}
