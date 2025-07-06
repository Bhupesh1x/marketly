"use client";

import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Categories } from "./Categories";
import { SearchInput } from "./SearchInput";
import CategoryBreadcrumbNavigation from "./CategoryBreadcrumbNavigation";

export function SearchFilters() {
  const trpc = useTRPC();
  const params = useParams();

  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  const activeCategory = params?.category || "all";
  const activeSubCategory = params?.subcategory;
  const activeCategoryData = categories?.find(
    (category) => category.slug === activeCategory
  );

  const activeSubCategoryName =
    activeCategoryData?.subcategories?.find(
      (subcategory) => subcategory.slug === activeSubCategory
    )?.name || "";

  return (
    <div
      className="px-4 lg:px-12 py-9 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryData?.color || "#F5F5F5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
      <CategoryBreadcrumbNavigation
        category={activeCategoryData?.name || ""}
        categorySlug={activeCategoryData?.slug || ""}
        subCategory={activeSubCategoryName}
      />
    </div>
  );
}

export function SearchFiltersSkeleton() {
  return (
    <div className="px-4 lg:px-12 py-9 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
}
