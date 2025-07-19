"use client";

import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";

interface Props {
  productName: string;
  productImage?: string | null;
  tenantName: string;
  price: number;
  tenantUrl: string;
  productUrl: string;
  onRemove: () => void;
}

export function CheckoutItem({
  price,
  tenantUrl,
  productUrl,
  tenantName,
  productName,
  productImage,
  onRemove,
}: Props) {
  return (
    <div className="border rounded-md overflow-hidden bg-white grid grid-cols-[8rem_1fr_auto]">
      <div className="relative aspect-square border-r">
        <Image
          src={productImage || "/images/placeholder.png"}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <Link href={productUrl}>
          <h4 className="font-semibold underline">{productName}</h4>
        </Link>
        <Link href={tenantUrl}>
          <h4 className="font-medium underline">{tenantName}</h4>
        </Link>
      </div>

      <div className="flex flex-col justify-between p-4">
        <p>{formatPrice(price)}</p>
        <button
          onClick={onRemove}
          className="text-sm underline font-[550] cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function CheckoutItemSkeleton() {
  return (
    <div className="border rounded-md overflow-hidden h-[130px] w-full bg-white animate-pulse" />
  );
}
