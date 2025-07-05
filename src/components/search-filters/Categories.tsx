"use client";

import { ListFilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Category } from "@/payload-types";

import { Button } from "../ui/button";

import { CategoryDropdown } from "./CategoryDropdown";

interface Props {
  data: Category[];
}

export function Categories({ data }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const viewAllRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(data?.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";

  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    function calculateVisible() {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef?.current?.offsetWidth;
      const viewAllWidth = viewAllRef?.current?.offsetWidth;
      const avaiableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect()?.width;

        if (totalWidth + width > avaiableWidth) break;
        totalWidth += width;
        visible++;
      }

      setVisibleCount(visible);
    }

    const resizeObserver = new ResizeObserver(calculateVisible);
    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current!);
    }

    return () => resizeObserver.disconnect();
  }, [data?.length]);

  return (
    <div className="relative w-full">
      <div
        ref={measureRef}
        className="absoulte opacity-0 flex pointer-events-none"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data?.map((category: Category) => (
          <CategoryDropdown
            key={category?.id}
            category={category}
            isActive={activeCategory === category.slug}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="flex flex-nowrap items-center"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data
          ?.slice(0, visibleCount)
          ?.map((category: Category) => (
            <CategoryDropdown
              key={category?.id}
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={`h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black ${isActiveCategoryHidden && !isAnyHovered ? "bg-white border-primary" : ""}`}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
