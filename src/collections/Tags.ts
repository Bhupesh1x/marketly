import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    read: () => true,
    delete: ({ req }) => isSuperAdmin(req?.user),
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};
