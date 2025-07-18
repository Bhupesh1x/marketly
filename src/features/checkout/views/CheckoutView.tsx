"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { useCart } from "../hooks/useCart";

interface Props {
  slug: string;
}

export function CheckoutView({ slug }: Props) {
  const { productIds, clearAllCarts } = useCart({ tenantSlug: slug });

  const trpc = useTRPC();
  const { data: products, error } = useQuery(
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

  return (
    <div>
      <h1>{JSON.stringify(products, null, 2)}</h1>
    </div>
  );
}
