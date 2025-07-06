import Link from "next/link";

interface Props {
  category: string;
  categorySlug: string;
  subCategory: string;
}

export default function CategoryBreadcrumbNavigation({
  category,
  categorySlug,
  subCategory,
}: Props) {
  return (
    <>
      {subCategory ? (
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium text-primary underline">
            <Link href={`/${categorySlug}`}>{category}</Link>
          </p>
          <p className="text-primary font-medium text-base">/</p>
          <p className="text-lg font-medium">{subCategory}</p>
        </div>
      ) : (
        <p className="text-lg font-medium">{category}</p>
      )}
    </>
  );
}
