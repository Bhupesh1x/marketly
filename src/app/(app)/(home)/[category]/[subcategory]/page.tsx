interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

async function SubCategoryPage({ params }: Props) {
  const { category, subcategory } = await params;

  return (
    <div>
      <h1>
        Sub Category Page: {category} | {subcategory}
      </h1>
    </div>
  );
}

export default SubCategoryPage;
