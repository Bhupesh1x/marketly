"use client";

import { Button } from "@/components/ui/button";

import { useCart } from "../hooks/useCart";

interface Props {
  productId: string;
  tenantSlug: string;
}

export function CartButton({ productId, tenantSlug }: Props) {
  const { toogleProduct, isProductInCart } = useCart({ tenantSlug });

  return (
    <Button
      variant="elevated"
      className={`flex-1 ${isProductInCart(productId) ? "bg-neutral-200" : ""}`}
      onClick={() => toogleProduct(productId)}
    >
      {isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
}
