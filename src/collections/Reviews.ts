import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "description",
  },
  fields: [
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "ratings",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "product",
      type: "relationship",
      hasMany: false,
      relationTo: "products",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      hasMany: false,
      relationTo: "users",
      required: true,
    },
  ],
};
