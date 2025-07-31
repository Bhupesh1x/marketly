"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { CategoryGetManyOutput } from "@/features/categories/types";

import { Button } from "../ui/button";

import { SubcategoryMenu } from "./SubcategoryMenu";

interface Props {
  category: CategoryGetManyOutput[1];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export function CategoryDropdown({
  category,
  isActive,
  isNavigationHovered,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function onMouseEnter() {
    if (category?.subcategories?.length) {
      setIsOpen(true);
    }
  }

  function onMouseLeave() {
    setIsOpen(false);
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={`h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black ${isActive && !isNavigationHovered ? "bg-white border-primary" : ""} ${isOpen ? "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] -translate-x-[4px] -translate-y-[4px]" : ""}`}
        >
          <Link
            prefetch
            href={`/${category?.slug === "all" ? "" : category.slug}`}
          >
            {category?.name}
          </Link>
        </Button>
        {category?.subcategories?.length ? (
          <div
            className={`opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 ${isOpen ? "opacity-100" : ""}`}
          />
        ) : null}
      </div>
      <SubcategoryMenu isOpen={isOpen} category={category} />
    </div>
  );
}
