import { Category } from "@/payload-types";

import { CategoryDropdown } from "./CategoryDropdown";

interface Props {
  data: Category[];
}

export function Categories({ data }: Props) {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap relative">
        {data?.map((category: Category) => (
          <CategoryDropdown key={category?.id} category={category} />
        ))}
      </div>
    </div>
  );
}
