import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Store name",
      admin: {
        description: "This is the name of the store (e.g. John's Store)",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "This is the subdomain of the store (e.g. [slug].marketly.com)",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
        description: "Stripe Account ID associated with your shop",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description:
          "You cannot create products until you submit your stripe details",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
    },
  ],
};
