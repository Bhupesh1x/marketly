"use client";

import { useState } from "react";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Category } from "@/payload-types";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CategorySidebar } from "./CategorySidebar";

interface Props {
  data: Category[];
  disabled?: boolean;
}

export function SearchInput({ data, disabled }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <CategorySidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
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
    </div>
  );
}
