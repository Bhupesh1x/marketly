import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "lucide-react";

import { formatPrice } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  price: number;
  authorName: string;
  imageUrl?: string | null;
  authorImageUrl?: string | null;
  rating: number;
  reviewCount: number;
}

export function ProductCard({
  id,
  name,
  price,
  rating,
  authorName,
  reviewCount,
  authorImageUrl,
  imageUrl,
}: Props) {
  return (
    <Link href={`/products/${id}`}>
      <div
        className={`border rounded-md py-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow`}
      >
        <div className="relative aspect-square">
          <Image
            fill
            src={imageUrl || "/images/placeholder.png"}
            alt={name}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y space-y-2">
          <p className="text-lg font-medium">{name}</p>
          <div className="flex items-center gap-1">
            {!!authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorName}
                height={16}
                width={16}
                className="h-[16px] w-[16px] rounded-full object-cover"
              />
            )}
            <p className="text-sm font-medium underline">{authorName}</p>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="fill-black size-3.5" />
            <p className="text-sm font-medium">
              {rating} ({reviewCount})
            </p>
          </div>
        </div>
        <div className="p-4">
          <p className="font-medium text-lg">{formatPrice(price)}</p>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-md animate-pulse" />
  );
}
