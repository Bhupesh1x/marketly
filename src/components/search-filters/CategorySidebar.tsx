"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { CategoryGetManyOutput } from "@/features/categories/types";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategorySidebar({ open, onOpenChange }: Props) {
  const router = useRouter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const [parentCategories, setParentCategories] =
    useState<CategoryGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryGetManyOutput[1] | null
  >(null);

  const currentCategory = parentCategories ?? data ?? [];

  function onBackClick() {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  }

  function handleOpenChange(open: boolean) {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  }

  function onCategoryClick(category: CategoryGetManyOutput[1]) {
    if (category?.subcategories?.length) {
      setParentCategories(
        (category?.subcategories as CategoryGetManyOutput) || []
      );
      setSelectedCategory(category);
    } else {
      // If leaf category (sub category) - Navigate to /category/subcategory
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        // direct category - Navigate to /category

        if (category?.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  }

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="p-0" style={{ backgroundColor }}>
        <SheetHeader className="border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full w-full overflow-y-auto text-left items-start">
          {!!parentCategories && (
            <button
              onClick={onBackClick}
              className="p-4 w-full hover:bg-black hover:text-white text-left cursor-pointer text-base font-medium flex items-center"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategory?.map((category) => (
            <button
              onClick={() => onCategoryClick(category)}
              key={category.id}
              className="p-4 w-full hover:bg-black hover:text-white text-left cursor-pointer text-base font-medium flex items-center justify-between"
            >
              {category?.name || ""}
              {!!category?.subcategories?.length && (
                <ChevronRightIcon className="size-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
