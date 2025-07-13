"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

function HomePage() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div>
      <h1>Home Page User: {JSON.stringify(data?.user, null, 2)}</h1>
    </div>
  );
}

export default HomePage;
