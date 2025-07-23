import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { formatPrice, generateTenantUrl } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  price: number;
  tenantSlug: string;
  imageUrl?: string | null;
  tenantImageUrl?: string | null;
  rating: number;
  reviewCount: number;
  isLibrary?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  rating,
  tenantSlug,
  reviewCount,
  tenantImageUrl,
  imageUrl,
  isLibrary,
}: Props) {
  const router = useRouter();

  function onTenantClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isLibrary) return;

    router.push(generateTenantUrl(tenantSlug));
  }

  return (
    <Link
      href={
        isLibrary
          ? `/library/${id}`
          : `${generateTenantUrl(tenantSlug)}/products/${id}`
      }
    >
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
        <div className={`p-4 space-y-2 ${isLibrary ? "border-t" : "border-y"}`}>
          <p className="text-lg font-medium">{name}</p>
          <div className="flex items-center gap-1">
            {!!tenantImageUrl && (
              <Image
                src={tenantImageUrl}
                alt={tenantSlug}
                height={16}
                width={16}
                className="h-[16px] w-[16px] rounded-full object-cover"
              />
            )}
            <p
              className={`text-sm font-medium ${isLibrary ? "" : "underline"}`}
              onClick={onTenantClick}
            >
              {tenantSlug}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="fill-black size-3.5" />
            <p className="text-sm font-medium">
              {rating} ({reviewCount})
            </p>
          </div>
        </div>
        {!isLibrary && (
          <div className="p-4">
            <p className="font-medium text-lg">{formatPrice(price)}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-md animate-pulse" />
  );
}
