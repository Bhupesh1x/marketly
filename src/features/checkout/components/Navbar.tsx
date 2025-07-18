import Link from "next/link";

import { generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Props {
  slug: string;
}

export function Navbar({ slug }: Props) {
  return (
    <nav className="h-20 border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-between gap-2 h-full px-4 lg:px-12">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium capitalize">Checkout</h1>
        </div>

        <Button variant="elevated" asChild>
          <Link href={generateTenantUrl(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
}
