import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useCart } from "../hooks/useCart";

interface Props {
  className?: string;
  tenantSlug: string;
  hideIfEmpty?: boolean;
}

export function CheckoutButton({ className, tenantSlug, hideIfEmpty }: Props) {
  const { totalItems } = useCart({ tenantSlug });

  if (hideIfEmpty && totalItems <= 0) return null;

  return (
    <Button asChild variant="elevated" className={`bg-white ${className}`}>
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
        <ShoppingCartIcon />{" "}
        <span className="text-sm pt-[1px]">
          {totalItems > 0 ? totalItems : ""}
        </span>
      </Link>
    </Button>
  );
}
