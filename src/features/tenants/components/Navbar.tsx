"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShoppingCartIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const CheckoutButton = dynamic(
  () =>
    import("@/features/checkout/components/CheckoutButton").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="bg-white">
        <ShoppingCartIcon className="text-black" />
      </Button>
    ),
  }
);

interface Props {
  slug: string;
}

export function Navbar({ slug }: Props) {
  const trpc = useTRPC();
  const { data: tenant } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <nav className="h-20 border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-between gap-2 h-full px-4 lg:px-12">
        <Link href={generateTenantUrl(slug)}>
          <div className="flex items-center gap-2">
            {!!tenant?.image?.url && (
              <Image
                src={tenant?.image?.url}
                alt="tenant image"
                height={32}
                width={32}
                className="rounded-full object-cover size-[32px]"
              />
            )}
            <h1 className="text-xl font-medium capitalize">
              {tenant?.name || ""}
            </h1>
          </div>
        </Link>

        <CheckoutButton hideIfEmpty tenantSlug={tenant?.slug} />
      </div>
    </nav>
  );
}

export function NavbarSkeleton() {
  return (
    <nav className="h-20 border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-between gap-2 h-full px-4 lg:px-12">
        <div />
        <Button disabled variant="elevated" className="bg-white">
          <ShoppingCartIcon className="text-black" />
        </Button>
      </div>
    </nav>
  );
}
