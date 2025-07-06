"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CategorySidebar } from "./CategorySidebar";

interface Props {
  disabled?: boolean;
}

export function SearchInput({ disabled }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const { data: session, isLoading } = useQuery(
    trpc.auth.session.queryOptions()
  );

  return (
    <div className="flex items-center gap-2">
      <CategorySidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search products"
          className="pl-8"
          disabled={disabled}
        />
      </div>
      <Button
        onClick={() => setIsSidebarOpen(true)}
        variant="elevated"
        className="size-12 block lg:hidden"
      >
        <ListFilterIcon className="size-6" />
      </Button>
      {!!session?.user && !isLoading && (
        <Button asChild variant="elevated">
          <Link href="/library">
            <BookmarkCheckIcon className="size-6" />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
}
