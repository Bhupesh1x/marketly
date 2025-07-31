"use client";

import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import { LinkIcon, StarIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { useTRPC } from "@/trpc/client";
import { formatPrice, generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/StarRating";

const CartButton = dynamic(
  () =>
    import("@/features/checkout/components/CartButton").then(
      (mod) => mod.CartButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled variant="elevated" className="flex-1">
        Add to cart
      </Button>
    ),
  }
);

interface Props {
  productId: string;
  tenantSlug: string;
}

export function ProductIdView({ productId, tenantSlug }: Props) {
  const trpc = useTRPC();
  const { data: product } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({
      id: productId,
    })
  );

  function onCopy() {
    try {
      navigator.clipboard?.writeText(window.location.href || "");
      toast.success("Product link copied");
    } catch {
      toast.error(
        "Failed to copy product url. Please try again after sometime"
      );
    }
  }

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border bg-white rounded-sm overflow-hidden">
        <div className="relative border-b aspect-video max-h-[450px] w-full">
          <Image
            fill
            src={product?.image?.url || "/images/placeholder.png"}
            alt={product?.name}
            className="object-contain bg-white"
          />
        </div>
        {/* Container */}
        <div className="w-full flex flex-col lg:flex-row">
          {/* Left */}
          <div className="lg:w-[65%] lg:border-r">
            <div className="p-4">
              <h1
                className="text-2xl font-medium line-clamp-2"
                title={product?.name || ""}
              >
                {product?.name || ""}
              </h1>
            </div>
            <div className="border-t flex flex-col lg:flex-row">
              <div className="flex">
                <p className="border-r p-4 font-medium min-w-[100px] flex items-center justify-center">
                  {formatPrice(product?.price)}
                </p>
                <div className="lg:border-r p-4 flex-1 lg:min-w-[150px] mx-auto flex items-center lg:justify-center box-border h-16">
                  <Link
                    href={generateTenantUrl(tenantSlug)}
                    className="flex items-center gap-1"
                  >
                    {!!product?.tenant?.image?.url && (
                      <Image
                        src={product?.tenant?.image?.url}
                        alt={product?.tenant?.name || "tenant"}
                        height={32}
                        width={32}
                        className="rounded-full"
                      />
                    )}
                    <p className="underline line-clamp-2">
                      {product?.tenant?.name || ""}
                    </p>
                  </Link>
                </div>
              </div>
              <div className="p-4 border-t lg:border-0 flex items-center gap-2">
                <StarRating rating={product.reviewRating || 0} />
                <p className="font-medium pt-[0.5]">
                  ({product?.reviewRating || 0}) {product?.reviewCount || 0}{" "}
                  ratings
                </p>
              </div>
            </div>
            <div className="p-4 border-t">
              {product?.description ? (
                <RichText data={product?.description} />
              ) : (
                <p>No description provided</p>
              )}
            </div>
          </div>
          {/* Right Rection */}
          <div className="lg:w-[35%] border-t lg:border-none">
            <div className="p-4 py-[1.27rem]">
              <div className="flex items-center gap-2">
                <CartButton
                  productId={product?.id}
                  tenantSlug={tenantSlug}
                  isPurchased={product?.isPurchased}
                />
                <Button variant="elevated" onClick={onCopy}>
                  <LinkIcon />
                </Button>
              </div>
              <p className="py-2 text-center font-medium">
                {product?.refundPolicy === "no-refunds"
                  ? "No refunds"
                  : `${product?.refundPolicy} money back guarantee`}
              </p>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Ratings</p>
                <div className="flex items-center gap-1">
                  <StarIcon className="size-4 fill-black" />
                  <p className="font-[550] pt-0.5">
                    ({product?.reviewRating || 0}) {product?.reviewCount || 0}{" "}
                    ratings
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <Fragment key={star}>
                    <p>
                      {star} {star === 1 ? "star" : "stars"}
                    </p>
                    <Progress
                      value={product?.reviewDistribution[star] || 0}
                      className="h-[1lh]"
                    />
                    <p>{product?.reviewDistribution[star] || 0} %</p>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductIdViewSkeleton() {
  return (
    <div className="px-4 lg:px-12 py-10 w-full">
      <div className="border bg-white animate-pulse h-[800px] w-full rounded-sm">
        <div className="relative border-b aspect-video max-h-[450px] w-full">
          <Image
            fill
            src="/images/placeholder.png"
            alt="product image"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
