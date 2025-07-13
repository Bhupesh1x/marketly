"use client";

import Link from "next/link";
import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";

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
      <Link href={generateTenantUrl(slug)}>
        <div className="max-w-(--breakpoint-xl) mx-auto flex items-center gap-2 h-full px-4 lg:px-12">
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
    </nav>
  );
}

export function NavbarSkeleton() {
  return (
    <nav className="h-20 border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center gap-2 h-full px-4 lg:px-12">
        <div />
      </div>
    </nav>
  );
}
