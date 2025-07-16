"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { LinkIcon, StarIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { formatPrice, generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/StarRating";

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

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border bg-white rounded-sm overflow-hidden">
        <div className="relative border-b aspect-video max-h-[450px] w-full">
          <Image
            fill
            src={product?.image?.url || "/images/placeholder.png"}
            alt={product?.name}
            className="object-cover"
          />
        </div>
        {/* Container */}
        <div className="w-full flex flex-col lg:flex-row">
          {/* Left */}
          <div className="lg:w-[65%] lg:border-r">
            <div className="p-4">
              <h1 className="text-2xl font-medium">{product?.name || ""}</h1>
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
                    <p className="underline">{product?.tenant?.name || ""}</p>
                  </Link>
                </div>
              </div>
              <div className="p-4 border-t lg:border-0 flex items-center gap-2">
                <StarRating rating={3} />
                <p className="font-medium pt-[0.5]">0 ratings</p>
              </div>
            </div>
            <div className="p-4 border-t">{product?.description || ""}</div>
          </div>
          {/* Right Rection */}
          <div className="lg:w-[35%] border-t lg:border-none">
            <div className="p-4 py-[1.27rem]">
              <div className="flex items-center gap-2">
                <Button variant="elevated" className="flex-1">
                  Add to cart
                </Button>
                <Button variant="elevated">
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
                  <p className="font-[550] pt-0.5">(0) 0 ratings</p>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <Fragment key={star}>
                    <p>
                      {star} {star === 1 ? "star" : "stars"}
                    </p>
                    <Progress value={5} className="h-[1lh]" />
                    <p>0 %</p>
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
