"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { InboxIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";

import { useCart } from "../hooks/useCart";

import {
  CheckoutSidebar,
  CheckoutSidebarSkeleton,
} from "../components/CheckoutSidebar";
import { CheckoutItem, CheckoutItemSkeleton } from "../components/CheckoutItem";

interface Props {
  slug: string;
}

export function CheckoutView({ slug }: Props) {
  const { productIds, clearAllCarts, removeProduct } = useCart({
    tenantSlug: slug,
  });

  const trpc = useTRPC();
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="py-10 px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4 space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <CheckoutItemSkeleton key={index} />
          ))}
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebarSkeleton />
        </div>
      </div>
    );
  }

  if (!products?.totalDocs) {
    return (
      <div className="py-10 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-md">
          <InboxIcon />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
      <div className="lg:col-span-4 space-y-4">
        {products?.docs?.map((product) => (
          <CheckoutItem
            key={product.id}
            productName={product?.name || ""}
            productImage={product?.image?.url}
            tenantName={product?.tenant?.name}
            price={product?.price}
            tenantUrl={generateTenantUrl(product?.tenant?.slug)}
            productUrl={`${generateTenantUrl(product?.tenant?.slug)}/${product?.id}`}
            onRemove={() => removeProduct(product?.id)}
          />
        ))}
      </div>
      <div className="lg:col-span-3">
        <CheckoutSidebar
          totalPrice={products?.totalPrice || 0}
          onCheckout={() => {}}
          isCancelled={false}
          isPending={false}
        />
      </div>
    </div>
  );
}
