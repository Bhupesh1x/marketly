"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useCart } from "../hooks/useCart";

interface Props {
  productId: string;
  tenantSlug: string;
  isPurchased?: boolean;
}

export function CartButton({ productId, tenantSlug, isPurchased }: Props) {
  const { toogleProduct, isProductInCart } = useCart({ tenantSlug });

  if (isPurchased) {
    return (
      <Button variant="elevated" className="flex-1" asChild>
        <Link href={`/library/${productId}`}>View in library</Link>
      </Button>
    );
  }

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
