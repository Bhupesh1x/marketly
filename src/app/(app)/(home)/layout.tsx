import { getPayload } from "payload";
import { Category } from "@/payload-types";
import configPromise from "@payload-config";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/search-filters";

interface Props {
  children: React.ReactNode;
}

async function layout({ children }: Props) {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData = data?.docs?.map((doc) => ({
    ...doc,
    subcategories: doc?.subcategories?.docs?.map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <main className="flex-1 bg-[#f4f4f0]">{children}</main>
      <Footer />
    </div>
  );
}

export default layout;
