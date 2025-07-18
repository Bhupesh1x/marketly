import { Suspense } from "react";
import { HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { Footer } from "@/features/tenants/components/Footer";
import { Navbar, NavbarSkeleton } from "@/features/tenants/components/Navbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

async function TenantHomeLayout({ children, params }: Props) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] flex flex-col">
      <HydrationBoundary>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <main className="w-full h-full flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default TenantHomeLayout;
