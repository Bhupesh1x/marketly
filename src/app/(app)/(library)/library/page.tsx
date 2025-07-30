import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";
import { caller, getQueryClient, trpc } from "@/trpc/server";

import { LibraryView } from "@/features/library/views/LibraryView";

export const dynamic = "force-dynamic";

async function LibraryPage() {
  const session = await caller.auth.session();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  );
}

export default LibraryPage;
