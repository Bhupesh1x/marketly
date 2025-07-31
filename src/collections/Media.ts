import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    update: ({ req }) => isSuperAdmin(req?.user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
