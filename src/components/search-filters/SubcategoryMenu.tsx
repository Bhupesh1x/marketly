import Link from "next/link";

import { CategoryGetManyOutput } from "@/features/categories/types";

interface Props {
  isOpen: boolean;
  category: CategoryGetManyOutput[1];
}

export function SubcategoryMenu({ category, isOpen }: Props) {
  if (!isOpen || !category?.subcategories?.length) return null;

  const backgroundColor = category?.color || "F5F5F5";
  return (
    <div
      className="absolute z-100"
      style={{
        left: 0,
        top: "100%",
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 rounded-md text-black border overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category?.subcategories?.map((subcategory) => (
            <Link
              prefetch
              key={subcategory.slug}
              href={`/${category?.slug}/${subcategory?.slug}`}
              className="w-full p-2 text-left flex items-center justify-between hover:underline font-medium hover:bg-black hover:text-white  transition"
            >
              {subcategory?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
