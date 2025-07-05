import Link from "next/link";

import { Category } from "@/payload-types";

interface Props {
  isOpen: boolean;
  category: Category;
  position: {
    top: number;
    left: number;
  };
}

export function SubcategoryMenu({ category, position, isOpen }: Props) {
  if (!isOpen || !category?.subcategories?.length) return null;

  const backgroundColor = category?.color || "F5F5F5";
  return (
    <div
      className="fixed z-100"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 rounded-md text-black border overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category?.subcategories?.map((category: Category) => (
            <Link
              key={category.slug}
              href="/"
              className="w-full p-2 text-left flex items-center justify-between hover:underline font-medium hover:bg-black hover:text-white  transition"
            >
              {category?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
